import { ActionReducerMap } from "@ngrx/store";
import { Post } from "../module/secure/interface/post";
import { postsReducer } from "./reducers/fb-posts.reducers";


export interface AppState {
    posts: ReadonlyArray<Post>;
}


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    posts: postsReducer
}