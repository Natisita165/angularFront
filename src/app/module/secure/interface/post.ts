import { PostComment } from "./post-comment";
export interface Post {
    postId: string;
    message: string;
    file?: File | null;
    fileUrl?: string;
    commentp: string;
    postcommentp: PostComment[];
  }