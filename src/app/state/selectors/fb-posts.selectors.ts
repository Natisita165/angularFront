import { createFeatureSelector } from "@ngrx/store";
import { Post } from "src/app/module/secure/interface/post";


export const selectPosts = createFeatureSelector<ReadonlyArray<Post>>('posts');
