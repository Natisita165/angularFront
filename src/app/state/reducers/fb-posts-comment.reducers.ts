import { createReducer, on } from "@ngrx/store";
import { addPostComment, retrievedPostCommentList, updatedPostComment } from "../actions/fb-posts-comment.action";
import { PostComment } from "src/app/module/secure/interface/post-comment";

export const initialState: ReadonlyArray<PostComment> = [];

export const postsCommentReducer = createReducer(
    initialState,
    on(addPostComment,(oldState, {pcomment}) => {
        return [...oldState, ...[pcomment]]
    }),
    on(retrievedPostCommentList,(oldState, {pcomments}) => {
        return [...oldState, ...pcomments]
    }),
    on(updatedPostComment, (oldState, { updatedComment }) => ({
        ...oldState,
        updatedComment: oldState.map(comment =>
            comment.commentId === updatedComment.commentId ? updatedComment : comment
        )
    }))
)


