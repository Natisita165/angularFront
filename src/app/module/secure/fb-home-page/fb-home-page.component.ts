import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FbBulletinFormComponent } from '../fb-bulletin-form/fb-bulletin-form.component';
import { Post } from '../interface/post';
import { Store } from '@ngrx/store';
import { retrievedPostList, updatedPost } from 'src/app/state/actions/fb-posts.action';
import { Observable } from 'rxjs';
import { selectPosts } from 'src/app/state/selectors/fb-posts.selectors';
import { PostComment } from '../interface/post-comment';
import { updatedPostComment } from 'src/app/state/actions/fb-posts-comment.action';

@Component({
  selector: 'app-home-page',
  templateUrl: './fb-home-page.component.html',
  styleUrls: ['./fb-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FbHomePageComponent{
  public postMessage: string;
  public postComment: string;
  public selectedFile: File | null;
  public fileUrl: string;
  private readonly _EMPTY: string = '';
  public listPosts: Post[];
  public listPosts$: Observable<any>;
  public listComments: PostComment[];
  private nextCommentId: number;
  private nextPostId: number;

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef, private store: Store<any>) {
    this.postMessage = this._EMPTY;
    this.postComment = this._EMPTY;
    this.selectedFile = null;
    this.fileUrl = this._EMPTY;
    this.listPosts = [];
    this.listPosts$ = this.store.select(selectPosts);
    this.nextCommentId=1;
    this.nextPostId=1;
    this.listComments = [
        
    ];
   }
  

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = () => {
          this.fileUrl = reader.result as string;
          
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.fileUrl = '';
      }
      
    }
    
  }

  public onSubmit(): void {
    if (!this.postMessage.trim()) {
      alert('El mensaje es obligatorio.');
      return;
    }
    
    const newPost: Post = {
      postId: this.nextPostId++,
      message: this.postMessage,
      file: this.selectedFile,
      fileUrl: this.fileUrl,
      commentp: this._EMPTY,
      postcommentp: []
    };

    console.log(newPost);
    
    this.store.dispatch(retrievedPostList({ posts: [newPost] }));
    this.cdr.markForCheck();
    this.resetPostFields();
    
  }

  

  public openDialog(post: Post, comment: any): void {
    const dialogRef = this.dialog.open(FbBulletinFormComponent, {
      width: '350px',
      data: { commentId: comment.commentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newupdatedComment: PostComment = {
          ...result,
          replies: [...(comment.replies || []), result],
          commentId: this.nextCommentId++ ,
          
        };

       
        const newupdatedPost: Post = {
          ...post,
          postcommentp: post.postcommentp.map(c => c.commentId === comment.commentId ? newupdatedComment : c)
        };


        const newupdatedComment2: PostComment = {
          ...result,
          commentPostId: newupdatedPost.postId
          
        };

        this.store.dispatch(updatedPost({ updatePost: newupdatedPost }));
        this.store.dispatch(updatedPostComment({ updatedComment: newupdatedComment2 }));
        this.store.dispatch(retrievedPostList({ posts: [newupdatedPost] }));

        this.cdr.detectChanges();
      }
    });
  }
  
  private resetPostFields(): void {
    this.postMessage = '';
    this.selectedFile = null;
    this.fileUrl = '';
    this.cdr.detectChanges();
  }
}

