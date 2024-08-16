export interface PostComment {
    commentId: number; 
    comments: string;
    replies: string[];
    replyText?: string;
  }