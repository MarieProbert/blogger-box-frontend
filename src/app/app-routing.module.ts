import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path : 'home', component: PostListComponent },
  { path : 'add-post', component: AddPostComponent },
  { path : '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
