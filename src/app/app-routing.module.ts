import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', loadChildren: () => import('./module/public/public.module').then(m => m.PublicModule) },
  { path: 'secure', loadChildren: () => import('./module/secure/secure.module').then(m => m.SecureModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'secure' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
