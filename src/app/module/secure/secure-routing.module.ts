import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbBulletinFormComponent } from './fb-bulletin-form/fb-bulletin-form.component';
import { FbHomePageComponent } from './fb-home-page/fb-home-page.component';
import { FbPostsListComponent } from './fb-posts-list/fb-posts-list.component';
import { FbPostsCommentComponent } from './fb-posts-comment/fb-posts-comment.component';
import { FbPostsListItemComponent } from './fb-posts-list-item/fb-posts-list-item.component';

const routes: Routes = [
  { path: '', component: FbHomePageComponent },
  { path: 'bulletin', component: FbBulletinFormComponent },
  { path: 'postslist', component: FbPostsListComponent},
  { path: 'postscomment', component: FbPostsCommentComponent},
  { path: 'postslistitem', component: FbPostsListItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
