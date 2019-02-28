import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Post } from '../../types';
import { QUERY_ALL_POSTS, SUBSCRIBE_TO_POSTS } from '../../graphql';

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
export class PostsListComponent implements OnInit, OnDestroy {
  postsQuery: QueryRef<Post[]>;
  posts: Post[];
  loading = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.postsQuery = this.apollo.watchQuery({
      query: QUERY_ALL_POSTS
    })

    this.postsQuery.valueChanges.subscribe((result) => {
      this.posts = result.data['posts'];
    })

    this.postsQuery.subscribeToMore({
      document: SUBSCRIBE_TO_POSTS,
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

