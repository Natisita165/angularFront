import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../interface/post';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPostsComment } from 'src/app/state/selectors/fb-posts-comment.selectors';
import { retrievedPostCommentList, updatedPostComment } from 'src/app/state/actions/fb-posts-comment.action';
import { PostComment } from '../interface/post-comment';
import { addPost, retrievedPostList, updatedPost } from 'src/app/state/actions/fb-posts.action';
import { selectPosts } from 'src/app/state/selectors/fb-posts.selectors';

@Component({
  selector: 'fb-posts-list',
  templateUrl: './fb-posts-list.component.html',
  styleUrls: ['./fb-posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbPostsListComponent implements OnChanges{
  @Input() posts: Post[] = [];
  @Output() openDialog;
  @Output() submitComment;
  private nextCommentId: number;
  private nextPostId: number;

  public listPosts$: Observable<any>;

  public postMessage: string;
  public postComment: string;
  public selectedFile: File | null;
  public fileUrl: string;

  private readonly _EMPTY: string = '';
  
  constructor(private cdr: ChangeDetectorRef, private store: Store){
    this.posts = [];
    this.openDialog=new EventEmitter<{ post: Post, comment: string }>();
    this.submitComment= new EventEmitter<{ post: Post, comment: string }>();
    this.nextCommentId=1;
    this.nextPostId=1;

    this.listPosts$ = this.store.select(selectPosts);

    this.postMessage = this._EMPTY;
    this.postComment = this._EMPTY;
    this.selectedFile = null;
    this.fileUrl = this._EMPTY;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  public handleSubmitComment(commentData: { post: Post, comment: string }): void {
    this.submitComment.emit(commentData);
  }
  
  public onSubmitComment(commentData: { post: Post, comment: string }): void {
    if (!commentData.comment.trim()) {
      alert('El comentario es obligatorio.');
      return;
    }

    const newComment: PostComment = {
      comments: commentData.comment,
      replies: [],
      commentId: this.nextCommentId++,
      commentPostId: commentData.post.postId
    
  };

  

  const newupdatedPost: Post = {
      ...commentData.post,
      postcommentp: [...(commentData.post.postcommentp || []), newComment]
  };

  const newComment2: PostComment = {
    comments: commentData.comment,
    replies: [],
    commentId: this.nextCommentId++,
    commentPostId: newupdatedPost.postId
  
};
  this.store.dispatch(updatedPostComment({ updatedComment: newComment2 }));
  this.store.dispatch(updatedPost({ updatePost: newupdatedPost }));
  

  this.cdr.detectChanges();
  }
/*
  public addNewPost(message: string, file: File | null, fileUrl: string): void {
    const newPost: Post = {
      postId: (this.nextPostId++).toString(), 
      message: message,
      file: file,
      fileUrl: fileUrl,
      commentp: '',
      postcommentp: []
    };

    this.store.dispatch(addPost({ post: newPost }));
    this.store.dispatch(retrievedPostList({ posts: [newPost] }));
  }*/
}

