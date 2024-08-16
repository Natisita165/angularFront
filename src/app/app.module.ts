import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FbToolbarComponent } from './module/public/fb-toolbar/fb-toolbar.component';
import { FbHomePageComponent } from './module/secure/fb-home-page/fb-home-page.component';
import { FbLogInComponent } from './module/public/fb-log-in/fb-log-in.component';
import { FbBulletinFormComponent } from './module/secure/fb-bulletin-form/fb-bulletin-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicRoutingModule } from './module/public/public-routing.module';
import { SecureRoutingModule } from './module/secure/secure-routing.module';
import { FbPostsListComponent } from './module/secure/fb-posts-list/fb-posts-list.component';
import { FbPostsCommentComponent } from './module/secure/fb-posts-comment/fb-posts-comment.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ROOT_REDUCERS } from './state/app.state';





@NgModule({
  declarations: [
    AppComponent,
    FbToolbarComponent,
    FbHomePageComponent,
    FbLogInComponent,
    FbBulletinFormComponent,
    FbPostsListComponent,
    FbPostsCommentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    PublicRoutingModule,
    SecureRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name:'FRONT' })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
