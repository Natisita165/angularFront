import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../interface/post';
import { PostComment } from '../interface/post-comment';
import { FbBulletinFormComponent } from '../fb-bulletin-form/fb-bulletin-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPostsComment } from 'src/app/state/selectors/fb-posts-comment.selectors';
import { addPostComment, retrievedPostCommentList, updatedPostComment } from 'src/app/state/actions/fb-posts-comment.action';
import { addPost, retrievedPostList } from 'src/app/state/actions/fb-posts.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fb-posts-comment',
  templateUrl: './fb-posts-comment.component.html',
  styleUrls: ['./fb-posts-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbPostsCommentComponent implements OnChanges{

  @Input() post!: Post;
  @Output() submitComment;

  private nextCommentId: number;
  private readonly _EMPTY: string = '';
 // public postsComment$: Observable<PostComment[]>;
 public postsComment$: Observable<ReadonlyArray<PostComment>>;

  public postComment: string;

  private nextPostId: number;

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef,private store: Store){

    this.submitComment = new EventEmitter<{ post: Post, comment: string }>();
    this.postsComment$ = this.store.select(selectPostsComment);
    /*this.postsComment$ = this.store.select(selectPostsComment).pipe(
      map(comments => comments.filter(comment => comment.commentPostId === this.post.postId))
    );*/
    
    this.nextCommentId=1;

 
    this.postComment = this._EMPTY;

    this.nextPostId=1;

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.postsComment$ = this.store.select(selectPostsComment).pipe(
        map(comments => comments.filter(comment => comment.commentPostId === this.post.postId))
      );
    }
  }
  
  public onSubmitComment(): void {
    if (!this.postComment.trim()) {
      alert('El comentario es obligatorio.');
      return;
    }
  
    const newComment: PostComment = {
      comments: this.postComment,
      replies: [],
      //commentId: this.nextCommentId++,
      commentId: Date.now(),
      commentPostId: this.post.postId
    };

    console.log('2', newComment);
    console.log('2', newComment.commentPostId);
    console.log('2.2', this.post["postId"]);
    console.log('2.3', this.submitComment);
    console.log('2.4', this.nextPostId++);

    this.store.dispatch(updatedPostComment({ updatedComment: newComment }));
    this.submitComment.emit({ post: this.post, comment: this.postComment });
    this.store.dispatch(retrievedPostCommentList({ pcomments: [newComment] }));
    
    
    this.cdr.detectChanges();

    this.postComment = this._EMPTY;
  }

  public openDialog(post: Post, comment: PostComment): void {
    const dialogRef = this.dialog.open(FbBulletinFormComponent, {
      width: '350px',
      data: { commentId: comment.commentId }
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        const updatedComment: PostComment = {
          ...comment,
          replies: [...(comment.replies || []), result]
        };
        this.store.dispatch(updatedPostComment({ updatedComment }));
        this.cdr.markForCheck();
      }
    });
  }
  
}