import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PostsList } from './components/posts-component';
import { GraphQLConfigModule } from './apollo.config';

@NgModule({
  declarations: [
    AppComponent,
    PostsList,
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
