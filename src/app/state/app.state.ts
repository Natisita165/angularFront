import { ActionReducerMap } from "@ngrx/store";
import { Post } from "../module/secure/interface/post";
import { postsReducer } from "./reducers/fb-posts.reducers";
import { postsCommentReducer } from "./reducers/fb-posts-comment.reducers";
import { PostComment } from "../module/secure/interface/post-comment";


export interface AppState {
    posts: ReadonlyArray<Post>;
    pcomments: ReadonlyArray<PostComment>;
}


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    posts: postsReducer,
    pcomments: postsCommentReducer,
}