import { apiClient } from "@/api/apiClient";

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.post(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  },
};