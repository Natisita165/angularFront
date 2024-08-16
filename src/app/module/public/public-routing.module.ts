import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbLogInComponent } from './fb-log-in/fb-log-in.component';

const routes: Routes = [
  {path: '', component: FbLogInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
