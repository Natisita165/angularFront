import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/module/secure/interface/post";


export const addPost = createAction(
    '[Posts List] Add Post',
    props<{post: Post}>()
)

export const updatedPost = createAction(
    '[Posts List] Update Post',
    props<{updatePost: Post}>()
)

export const retrievedPostList = createAction(
    '[Posts List/API] Retrieve Post Success',
    props<{ posts: ReadonlyArray<Post> }>()
)




