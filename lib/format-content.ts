/**
 * Escapes HTML entities to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Converts plain text content to HTML with proper paragraph formatting.
 * - Double line breaks (\n\n) become paragraph separators
 * - Single line breaks (\n) become <br /> within paragraphs
 * - HTML entities are escaped to prevent XSS
 *
 * @param content - The plain text content to format
 * @returns HTML string with <p> and <br /> tags
 */
export function formatContentToHtml(content: string): string {
  if (!content) return "";

  // Escape HTML entities first (XSS prevention)
  const escaped = escapeHtml(content);

  // Normalize line endings
  const normalized = escaped.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split by double newlines into paragraphs
  const paragraphs = normalized.split(/\n\n+/);

  // Convert single newlines to <br /> within paragraphs
  // Filter out empty paragraphs
  return paragraphs
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/**
 * Truncates text to a specified number of words, adding ellipsis if truncated.
 *
 * @param content - The text content to truncate
 * @param maxWords - Maximum number of words to keep
 * @returns Truncated text with "..." if it was cut, or original text if shorter
 */
export function truncateWords(content: string, maxWords: number): string {
  if (!content) return "";

  // Split by whitespace and filter empty strings
  const words = content.split(/\s+/).filter((w) => w.length > 0);

  if (words.length <= maxWords) {
    return content.trim();
  }

  return words.slice(0, maxWords).join(" ") + "...";
}
