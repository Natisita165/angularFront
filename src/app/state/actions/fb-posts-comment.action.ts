import { createAction, props } from "@ngrx/store"
import { PostComment } from "src/app/module/secure/interface/post-comment"



export const addPostComment = createAction(
    '[Comment List] Add Comment',
    props<{pcomment: PostComment}>()
)

export const updatedPostComment = createAction(
    '[Comments List] Update Comment',
    props<{updatedComment: PostComment}>()
)

export const retrievedPostCommentList = createAction(
    '[Comments List/API] Retrieve Comment Success',
    props<{ pcomments: ReadonlyArray<PostComment> }>()
)

