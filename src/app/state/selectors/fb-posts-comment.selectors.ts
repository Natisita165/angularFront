import { createFeatureSelector } from "@ngrx/store";
import { PostComment } from "src/app/module/secure/interface/post-comment";

export const selectPostsComment = createFeatureSelector<ReadonlyArray<PostComment>>('pcomments');