import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '../types';
import { ALL_POSTS_QUERY } from '../graphql';

type Response = {
  loading: boolean;
  posts: Post[];
}

@Component({
  selector: 'posts-list',
  template: `
    <div> Current Articles </div>
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="posts">
      <div *ngFor="let post of posts">
        <p>{{ post.author?.name | titlecase }}'s "{{ post.title }}"</p>
      </div>
    </div>
  `,
})
export class PostsListComponent implements OnInit {
  postSubscription: Subscription;
  posts: Post[];
  loading = true;
  error: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<Response>({
      query: ALL_POSTS_QUERY
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.posts = data.posts;
    })
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}

