"use server";

import prisma from "@/lib/db";
import { AdminRole } from "@/lib/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function createUsers(formData: FormData) {
  const email = formData.get("email") as string;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      email,
      emailVerified: new Date(),
      role: formData.get("role") as AdminRole,
    },
  });

  revalidatePath("/users");
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const role = formData.get("role") as AdminRole;
  const isSuspended = formData.get("isSuspended") === "true";

  await prisma.user.update({
    where: { id },
    data: {
      role,
      isSuspended,
    },
  });

  revalidatePath("/users");
}

export async function createNews(
  formData: FormData,
  uploadedImageUrl?: string,
) {
  await prisma.newsPost.create({
    data: {
      featuredImage: uploadedImageUrl,
      title: formData.get("title") as string,
      status: Boolean(formData.get("status")),
      content: formData.get("content") as string,
    },
  });
  revalidatePath("/news-post");
}

export async function updateNews(
  formData: FormData,
  id: string,
  uploadedImageUrl?: string,
  galleryUrls?: string[],
  imagesToDelete?: string[],
) {
  try {
    // Validation
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") === "true";

    if (!title?.trim()) {
      throw new Error("Title is required");
    }

    if (title.length > 200) {
      throw new Error("Title too long (max 200 characters)");
    }

    // Build update data
    const updateData: any = {
      title: title.trim(),
      content: content?.trim() || null,
      status,
    };

    // Only update image if provided
    if (uploadedImageUrl !== undefined) {
      updateData.featuredImage = uploadedImageUrl;
    }

    // Handle gallery images (merge new, remove deleted)
    const needsGalleryUpdate =
      (galleryUrls && galleryUrls.length > 0) ||
      (imagesToDelete && imagesToDelete.length > 0);

    if (needsGalleryUpdate) {
      const existingPost = await prisma.newsPost.findUnique({
        where: { id },
        select: { imageGallery: true },
      });
      let currentGallery = existingPost?.imageGallery || [];

      // Remove deleted images
      if (imagesToDelete && imagesToDelete.length > 0) {
        currentGallery = currentGallery.filter(
          (url) => !imagesToDelete.includes(url),
        );
      }

      // Add new images
      if (galleryUrls && galleryUrls.length > 0) {
        currentGallery = [...currentGallery, ...galleryUrls];
      }

      updateData.imageGallery = currentGallery;
    }

    // Update in database
    await prisma.newsPost.update({
      where: { id },
      data: updateData,
    });

    // Revalidate cache
    revalidatePath("/news-post");
    revalidatePath(`/news-post/update-news/${id}`);
    revalidatePath("/news");
  } catch (error) {
    console.error("Update news error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update news",
    );
  }
}

export async function createOrganization(
  formData: FormData,
  uploadedImageUrl?: string,
) {
  await prisma.organization.create({
    data: {
      profilePhoto: formData.get("profilePhoto") as string,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      trainingStartedAt: formData.get("joined") as string,
    },
  });
  revalidatePath("/organization-management");
}

export async function updateOrganization(
  formData: FormData,
  id: string,
  uploadedImageUrl?: string,
) {
  try {
    // Validation
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;

    if (!name?.trim()) {
      throw new Error("Organization name is required");
    }

    if (name.length > 200) {
      throw new Error("Organization name too long (max 200 characters)");
    }

    // Build update data
    const updateData: any = {
      name: name.trim(),
      location: location?.trim() || null,
    };

    // Only update image if provided
    if (uploadedImageUrl !== undefined) {
      updateData.profilePhoto = uploadedImageUrl;
    }

    // Update in database
    await prisma.organization.update({
      where: { id },
      data: updateData,
    });

    // Revalidate cache
    revalidatePath("/organization-management");
    revalidatePath(`/organization-management/update-organization/${id}`);
  } catch (error) {
    console.error("Update organization error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update organization",
    );
  }
}
