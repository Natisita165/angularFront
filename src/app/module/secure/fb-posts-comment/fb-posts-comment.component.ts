import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Post } from '../interface/post';
import { PostComment } from '../interface/post-comment';
import { FbBulletinFormComponent } from '../fb-bulletin-form/fb-bulletin-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPostsComment } from 'src/app/state/selectors/fb-posts-comment.selectors';
import { retrievedPostCommentList } from 'src/app/state/actions/fb-posts-comment.action';

@Component({
  selector: 'fb-posts-comment',
  templateUrl: './fb-posts-comment.component.html',
  styleUrls: ['./fb-posts-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbPostsCommentComponent {

  @Input() post: Post = {} as Post;
  @Output() submitComment;

  public postComment: string;
  private readonly _EMPTY: string = '';
  public postsComment$: Observable<ReadonlyArray<PostComment>>;

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef,private store: Store){

    this.submitComment = new EventEmitter<{ post: Post, comment: string }>();
    this.postComment = this._EMPTY;
    this.postsComment$ = this.store.select(selectPostsComment);
    this.postsComment$.subscribe(data => {
      console.log('Posts comments:', data);
    });
    
  }

  public onSubmitComment(): void {
    if (this.postComment.trim()) {
      this.submitComment.emit({ post: this.post, comment: this.postComment });
      this.postComment = '';
      this.cdr.markForCheck();
    }
  }


  public openDialog(post: Post, comment: PostComment): void {
    const dialogRef = this.dialog.open(FbBulletinFormComponent, {
      width: '350px',
      data: { commentId: comment.commentId }
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result !== undefined) { 
        const targetComment = post.postcommentp.find((c: PostComment) => c.commentId === comment.commentId);
        if (targetComment) {

          const newupdatedComment = { ...targetComment, replies: [...(targetComment.replies || []), result] };
          this.store.dispatch(retrievedPostCommentList({ pcomments: [newupdatedComment] }));
          this.cdr.markForCheck();
        }
      }
    });
  }
}
