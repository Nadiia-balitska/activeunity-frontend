export interface CommentAuthor {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface EventComment {
  _id: string;
  event: string;
  author: CommentAuthor;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  success: boolean;
  count: number;
  comments: EventComment[];
}

export interface CreateCommentResponse {
  success: boolean;
  comment: EventComment;
}