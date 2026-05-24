import { apiClient } from "@/api/apiClient";

import type {
  CommentsResponse,
  CreateCommentResponse,
} from "@/types/comment";

export const commentService = {
  getEventComments: async (eventId: string): Promise<CommentsResponse> => {
    const response = await apiClient.get<CommentsResponse>(
      `/events/${eventId}/comments`
    );

    return response.data;
  },

  createComment: async (
    eventId: string,
    text: string
  ): Promise<CreateCommentResponse> => {
    const response = await apiClient.post<CreateCommentResponse>(
      `/events/${eventId}/comments`,
      { text }
    );

    return response.data;
  },

  deleteComment: async (commentId: string) => {
    const response = await apiClient.delete(`/comments/${commentId}`);
    return response.data;
  },
};