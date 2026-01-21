"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateNews } from "@/actions/actions";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { UploaderProvider } from "@/components/upload/uploader-provider";
import { slugify } from "@/lib/slugify";
import * as React from "react";

interface UpdateNewsData {
  id: string;
  title: string;
  content: string | null;
  featuredImage: string | null;
  status: boolean;
}

interface Props {
  initialData: UpdateNewsData;
}

export default function UpdateNewsFormClient({ initialData }: Props) {
  const [title, setTitle] = React.useState(initialData.title);
  const [content, setContent] = React.useState(initialData.content || "");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = ({ allFiles }: { allFiles: any[] }) => {
    const file = allFiles[0];
    setSelectedFile(file?.file || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      let finalImageUrl = initialData.featuredImage; // Keep existing by default

      // Only upload if user selected a new file
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);
        uploadFormData.append("slug", slugify(title));

        const uploadRes = await fetch("/api/nextcloud/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          throw new Error(data.error || "Upload failed");
        }

        const { url } = await uploadRes.json();
        finalImageUrl = url;
      }

      // Call server action with correct signature
      await updateNews(formData, initialData.id, finalImageUrl || undefined);

      alert("News updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      console.error("Update failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Error display */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Featured Image */}
            <FieldSet>
              <FieldGroup>
                {/* Show existing image preview when no new file selected */}
                {!selectedFile && initialData.featuredImage && (
                  <div className="mb-4">
                    <FieldLabel>Current Featured Image</FieldLabel>
                    <img
                      src={initialData.featuredImage}
                      alt="Current featured image"
                      className="mt-2 w-48 h-48 object-cover rounded border"
                    />
                  </div>
                )}

                {/* Dropzone for new image */}
                <FieldLabel>
                  {selectedFile
                    ? "New Featured Image"
                    : "Upload New Featured Image (Optional)"}
                </FieldLabel>
                <UploaderProvider autoUpload={false} onChange={handleFileChange}>
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    dropzoneOptions={{
                      maxSize: 1024 * 1024 * 5, // 5 MB
                      accept: { "image/*": [] },
                    }}
                  />
                </UploaderProvider>
              </FieldGroup>
            </FieldSet>

            {/* Title */}
            <FieldSet>
              <FieldLegend>News Post</FieldLegend>
              <FieldDescription>Update the article for BYTE</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="news-title">News Title</FieldLabel>
                  <Input
                    id="news-title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* Content */}
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="news-content">Content</FieldLabel>
                  <Textarea
                    id="news-content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add any additional comments"
                    className="resize-none"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* Status (hidden field) */}
            <input type="hidden" name="status" value={String(initialData.status)} />

            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
