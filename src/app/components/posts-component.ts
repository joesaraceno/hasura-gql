import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Post {
  id: number;
  title: string;
  published: boolean;
  author_id: number
}

interface User {
  id: number;
  email: string;
  name: string;
  posts: Post[]
}

type Response = {
  posts: Post[];
}

@Component({
  selector: 'posts-list',
  template: `
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
export class PostsList implements OnInit {
  posts: Post[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        query: gql`
          {
            posts {
              author {id, name},
              id
              title
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.posts = result.data.posts;
        this.loading = false;
      });
  }
}
