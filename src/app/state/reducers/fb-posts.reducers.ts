import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/module/secure/interface/post";
import { addPost, retrievedPostList, updatedPost } from "../actions/fb-posts.action";
import { updatedPostComment } from "../actions/fb-posts-comment.action";

export const initialState: ReadonlyArray<Post> = [];

export const postsReducer = createReducer(
    initialState,
    on(addPost,(oldState, {post}) => {
        return [...oldState, ...[post]]
    }),
    on(retrievedPostList,(oldState, {posts}) => {
        return [...oldState, ...posts]
        //return oldState.concat(posts);
    }),
    on(updatedPost, (state, { updatePost }) => {
        console.warn("updatePost", updatePost);
        return state;
    })
  
)


