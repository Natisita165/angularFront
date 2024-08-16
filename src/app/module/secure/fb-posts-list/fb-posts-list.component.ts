import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../interface/post';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPostsComment } from 'src/app/state/selectors/fb-posts-comment.selectors';
import { retrievedPostCommentList, updatedPostComment } from 'src/app/state/actions/fb-posts-comment.action';
import { PostComment } from '../interface/post-comment';
import { retrievedPostList, updatedPost } from 'src/app/state/actions/fb-posts.action';

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
  public postsComments$: Observable<any>;
  public postsComments: PostComment[];

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

    this.postsComments$ = this.store.select(selectPostsComment);
    this.postsComments = [];

    this.postMessage = this._EMPTY;
    this.postComment = this._EMPTY;
    this.selectedFile = null;
    this.fileUrl = this._EMPTY;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes)
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
      commentId: this.nextCommentId++
      
    };
    const newPost: Post = {
      postId: 'this.posts',
      message: this.postMessage,
      file: this.selectedFile,
      fileUrl: this.fileUrl,
      commentp: commentData.comment,
      postcommentp: []
    };


    this.store.dispatch(updatedPost({ updatePost: newPost}));
    this.store.dispatch(updatedPostComment({ updatedComment: newComment }));
    
    this. postsComments = [newComment];


    console.log('2',updatedPostComment({updatedComment: newComment}));
    console.log('3',updatedPostComment);
    console.log('4',{updatedComment: newComment} );
    console.log('5',this.postsComments$);
    console.log('6',newComment);
    console.log('7',this.posts);
    console.log('8',this.postsComments);

    this.cdr.detectChanges(); 
   // const postIndex = this.posts.indexOf(commentData.post);
    //if (postIndex !== -1) {
      
      //this.postsComment[postIndex].commentId
      //this.postsComment =[...this.postsComment];
      console.log('11');
      this.store.dispatch(retrievedPostCommentList({ pcomments: [newComment] }));
      console.log('12');
      this.store.dispatch(retrievedPostList({ posts: [newPost] }));

      console.log('9',retrievedPostCommentList({ pcomments: [newComment] }));
      console.log('10',this.postsComments);
      console.warn("POAT",this.posts)



     // this.store.dispatch(retrievedPostCommentList({ pcomments: [newComment] }));
      //this.posts[postIndex].comments.push(newComment);
      //this.posts =[...this.posts];

      
   // }
  }
}

