import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { Post } from '../types';
import { ALL_POSTS_QUERY, POST_SUBSCRIPTION } from '../graphql';

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
  postsQuery: QueryRef<Post[]>;
  posts: Post[];
  loading = true;
  error: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.postsQuery = this.apollo.watchQuery({
      query: ALL_POSTS_QUERY
    })

    this.postsQuery.valueChanges.subscribe((result) => {
      this.posts = result.data['posts'];
    })

    this.postsQuery.subscribeToMore({
      document: POST_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData}) => {
        if(!subscriptionData.data) {
          return prev;
        }
        return subscriptionData.data;
      }
    })
  }

  ngOnDestroy() {
    // this.postsQuery.unsubscribe();
  }
}

