import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../interface/post';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPostsComment } from 'src/app/state/selectors/fb-posts-comment.selectors';
import { retrievedPostCommentList, updatedPostComment } from 'src/app/state/actions/fb-posts-comment.action';
import { PostComment } from '../interface/post-comment';
import { addPost, retrievedPostList, updatedPost } from 'src/app/state/actions/fb-posts.action';
import { selectPosts } from 'src/app/state/selectors/fb-posts.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fb-posts-list-item',
  templateUrl: './fb-posts-list-item.component.html',
  styleUrls: ['./fb-posts-list-item.component.scss']
})
export class FbPostsListItemComponent implements OnChanges {

  @Output() openDialog;
  @Input() post!: Post;
  @Output() submitComment;

  private nextCommentId: number;
  //public postsComments$: Observable<PostComment[]>;
  public postsComments$: Observable<ReadonlyArray<PostComment>>;
  public postsComments: PostComment[];

  private readonly _EMPTY: string = '';

  private nextPostId: number;
  
  constructor(private cdr: ChangeDetectorRef, private store: Store){

    this.openDialog=new EventEmitter<{ post: Post, comment: PostComment }>();
    this.submitComment= new EventEmitter<{ post: Post, comment: string }>();
    this.nextCommentId=1;

    this.postsComments$ = this.store.select(selectPostsComment);
    /*this.postsComments$ = this.store.select(selectPostsComment).pipe(
      map(comments => comments.filter(comment => comment.commentPostId === this.post.postId))
    );*/
    this.postsComments = [];

    this.nextPostId=1;



  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      //console.log('Post received in FbPostsListItemComponent:', this.post);
    }
  }


  public handleSubmitComment(commentData: { post: Post, comment: string }): void {
    
    if (!commentData.comment.trim()) {
      alert('El comentario es obligatorio.');
      return;
    }

  
    const newComment: PostComment = {
      comments: commentData.comment,
      replies: [],
      //commentId: this.nextCommentId++,
      commentId: Date.now(),
      commentPostId: commentData.post.postId
      
      
    };
    console.log('1', newComment);


    this.store.dispatch(updatedPostComment({ updatedComment: newComment }));
    
    const newupdatedPost: Post = {
      ...commentData.post,
      postcommentp: [...(commentData.post.postcommentp || []), newComment]
    };
    console.log('1', newupdatedPost);
    this.store.dispatch(updatedPost({ updatePost: newupdatedPost }));

    this.cdr.detectChanges();
  }


}
