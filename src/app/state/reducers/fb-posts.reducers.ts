import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/module/secure/interface/post";
import { addPost, retrievedPostList, updatedPost } from "../actions/fb-posts.action";
import { updatedPostComment } from "../actions/fb-posts-comment.action";
import { PostComment } from "src/app/module/secure/interface/post-comment";

export const initialState: ReadonlyArray<Post> = [];

export const postsReducer = createReducer(
    initialState,
    on(addPost,(state, {post}) => [...state, post]),

    on(retrievedPostList,(state, {posts}) => posts),

    on(updatedPost, (state, { updatePost }) => state.map(post =>
      post.postId === updatePost.postId ? updatePost : post
  )
)
  
)


