import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './components/posts-list.component/posts-list.component';
import { OtherViewComponent } from './views/other.view/other.view';
import { HomeViewComponent } from './views/home.view/home.view.component';

const routes: Routes = [
  { path: 'home', component: HomeViewComponent },
  { path: 'other', component: OtherViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
