import { useEffect, useMemo, useRef, useState } from "react";

type Skill = {
  id: string;
  name: string;
  value: string;
};

type SkillCategory = {
  category: string;
  skills: Skill[];
};

interface MultiSelectProps {
  categories: SkillCategory[];
  placeholder?: string;
  name?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
}

export default function MultiSelect({
  categories,
  placeholder = "Select skills...",
  name,
  value,
  onChange,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = value ?? internalSelected;
  const skillMap = useMemo(
    () =>
      new Map(
        categories
          .flatMap((group) => group.skills)
          .map((skill) => [skill.value, skill]),
      ),
    [categories],
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateSelected = (next: string[]) => {
    if (value === undefined) {
      setInternalSelected(next);
    }
    onChange?.(next);
  };

  const toggleOption = (skill: Skill) => {
    const exists = selected.includes(skill.value);
    if (exists) {
      updateSelected(selected.filter((item) => item !== skill.value));
    } else {
      updateSelected([...selected, skill.value]);
    }
  };

  const removeTag = (value: string) => {
    updateSelected(selected.filter((item) => item !== value));
  };

  return (
    <div ref={containerRef} className="relative w-80">
      {name &&
        selected.map((skill) => (
          <input key={skill} type="hidden" name={name} value={skill} />
        ))}

      {/* Input / Tag Container */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="min-h-[44px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 flex flex-wrap items-center gap-2 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}

        {selected.map((item) => {
          const skill = skillMap.get(item);
          if (!skill) return null;

          return (
          <span
            key={item}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
          >
            {skill.name}
            <button
              type="button"
              onClick={() => removeTag(item)}
              className="hover:text-red-500 font-semibold"
            >
              ×
            </button>
          </span>
        )})}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="pb-50">
        <div className="absolute z-50 mt-3 w-full
                        rounded-xl border border-gray-200 bg-white shadow-xl
                        max-h-72 overflow-y-auto">
          {categories.map((group, groupIndex) => (
            <div key={group.category}>
              {/* Category Header */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50 sticky top-0">
                {group.category}
              </div>

              {/* Skills */}
              {group.skills.map((skill) => {
                const checked = selected.includes(skill.value);

                return (
                  <label
                    key={skill.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOption(skill)}
                      className="mr-2 accent-blue-600"
                    />
                    <span className="text-sm text-gray-700">
                      {skill.name}
                    </span>
                  </label>
                );
              })}

              {/* Divider */}
              {groupIndex !== categories.length - 1 && (
                <div className="border-t border-gray-200 my-1" />
              )}
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}
