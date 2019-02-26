// angular base and base components
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from  './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GraphQLConfigModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
