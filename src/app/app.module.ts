// angular base and base components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// gql/net stuff
import { GraphQLConfigModule } from './apollo.config';
import { HttpClientModule } from '@angular/common/http';

// custom components
import { PostsListComponent } from './components/posts-list.component';
import { NewPostComponent } from './components/new-post.component/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLConfigModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
