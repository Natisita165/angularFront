import { createReducer, on } from '@ngrx/store';
import { updatedPostComment, retrievedPostCommentList, addPostComment } from '../actions/fb-posts-comment.action';
import { PostComment } from 'src/app/module/secure/interface/post-comment';


export const initialState: ReadonlyArray<PostComment> = [];

export const postsCommentReducer = createReducer(
    initialState,
    on(addPostComment,(state, {pcomment}) => [...state, pcomment]),
    
    on(retrievedPostCommentList,(state, {pcomments}) => [...state, ...pcomments]),
    
    //on(retrievedPostCommentList,(state, {pcomments}) => pcomments),

    on(updatedPostComment, (state, { updatedComment }) => 
        state.map(commentu =>
            commentu.commentId === updatedComment.commentId ? updatedComment : commentu
        )
    )
)


