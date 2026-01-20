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
import createNews from "@/actions/actions";
import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import * as React from "react";

export default function CreateNewsForm() {
  const uploadFn: UploadFn = React.useCallback(
  ({ file, onProgressChange, signal }) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("file", file);

      xhr.open("POST", "/api/upload/nextcloud");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgressChange?.(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);

          // ✅ ONLY return what UploadFn expects
          resolve({
            url: response.url,
          });
        } else {
          reject(
            new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`)
          );
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));

      signal?.addEventListener("abort", () => {
        xhr.abort();
        reject(new Error("Upload aborted"));
      });

      xhr.send(formData);
    });
  },
  [],
);



  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-md">
          <form action={createNews}>
            <FieldGroup>
              {/* ------------- Featured Image ------------- */}
              <FieldSet>
                <FieldGroup>
                  <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone
                      height={200}
                      width={200}
                      dropzoneOptions={{
                        maxSize: 1024 * 1024 * 1, // 1 MB
                        accept: {
                          "image/*": [],
                        },
                      }}
                    />
                  </UploaderProvider>
                </FieldGroup>
              </FieldSet>
              {/* ------------- Title ------------- */}
              <FieldSet>
                <FieldLegend>News Post</FieldLegend>
                <FieldDescription>Post an article for BYTE</FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      News Title
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-name-43j"
                      name="title"
                      placeholder="Title"
                      required
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              {/* ------------- Content ------------- */}
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-optional-comments">
                      Content
                    </FieldLabel>
                    <Textarea
                      id="checkout-7j9-optional-comments"
                      name="content"
                      placeholder="Add any additional comments"
                      className="resize-none"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
