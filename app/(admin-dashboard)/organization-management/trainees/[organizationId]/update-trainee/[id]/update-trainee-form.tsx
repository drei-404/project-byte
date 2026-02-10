"use client";

import { updateTrainee } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { UploaderProvider } from "@/components/upload/uploader-provider";
import { useToast } from "@/contexts/toast-context";
import { useRouter } from "next/navigation";
import React from "react";

interface UpdateTraineeData {
  id: string;
  profilePhoto: string | null;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  organizationId: string;
}

interface Props {
  initialData: UpdateTraineeData;
}

export default function UpdateTraineeForm({ initialData }: Props) {
  const [fullName, setFullName] = React.useState(initialData.fullName);
  const [email, setEmail] = React.useState(initialData.email ?? "");
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialData.phoneNumber ?? "",
  );
  const [address, setAddress] = React.useState(initialData.address ?? "");
  const [selectedPhoto, setSelectedPhoto] = React.useState<File | null>(null);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handlePhotoChange = React.useCallback(
    ({ allFiles }: { allFiles: any[] }) => {
      const file = allFiles[0];
      setSelectedPhoto(file?.file || null);
    },
    [],
  );

  const noopUploadFn = React.useCallback(async () => ({ url: "" }), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      let finalImageUrl = initialData.profilePhoto;

      if (selectedPhoto) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedPhoto);
        uploadFormData.append("fullName", fullName);
        uploadFormData.append("organizationId", initialData.organizationId);

        const uploadRes = await fetch("/api/nextcloud/trainees/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          throw new Error(data.error || "Profile photo upload failed");
        }

        const { url } = await uploadRes.json();
        finalImageUrl = url;
      }

      await updateTrainee(
        formData,
        initialData.id,
        finalImageUrl || undefined,
      );

      toast.success("Trainee updated successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <FieldSet>
              <FieldGroup>
                <FieldLabel>
                  {!selectedPhoto && initialData.profilePhoto
                    ? "Current Profile Photo"
                    : "Upload New Profile Photo (Optional)"}
                </FieldLabel>

                {!selectedPhoto && initialData.profilePhoto && (
                  <img
                    src={initialData.profilePhoto}
                    alt="Current profile photo"
                    className="w-[200px] h-[200px] object-cover rounded-md"
                  />
                )}

                <UploaderProvider
                  autoUpload={false}
                  onChange={handlePhotoChange}
                  uploadFn={noopUploadFn}
                >
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    dropzoneOptions={{
                      maxSize: 1024 * 1024 * 5,
                      accept: { "image/*": [] },
                    }}
                  />
                </UploaderProvider>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation={"horizontal"} className="flex justify-end">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  router.push(
                    `/organization-management/trainees/${initialData.organizationId}`,
                  )
                }
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
