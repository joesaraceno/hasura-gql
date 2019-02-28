import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Author, Post } from '../../types';
import { QUERY_ALL_AUTHORS, AllAuthorsQueryResponse, SUBMIT_NEW_POST, QUERY_ALL_POSTS } from 'src/app/graphql';

interface Response {
  users: Author[];
}

// TODO: remov this once we put in forms
// just for dummy crud until we get forms up and running
function newPost(config: Post): { id: number, title: string, published: boolean } {
  let defaultPost = { id: Math.floor((Math.random() * 10000)), title: 'tata', published: false }

  if (config.title) {
    defaultPost.title = config.title;
  }

  if (config.published) {
    defaultPost.published = config.published;
  }

  return defaultPost;
}

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  // TODO: replace this with a queryRef?
  authorsSubscription: Subscription;
  authors: Author[];
  loading = true;
  submitting = false;
  error: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<AllAuthorsQueryResponse>({
      query: QUERY_ALL_AUTHORS
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.authors = data.allAuthors;
      setTimeout(() => {
        this.submitting = true;
        this.submitPost();
      }, 4 * 1000)
    })
  }

  ngOnDestroy() {
    this.authorsSubscription.unsubscribe();
  }

  submitPost() {
    // TODO: put in forms so we're relying on this automatic post
    // just to generate the dummy post
    let someNewPost = newPost({ title: 'goodbye-' + Math.floor(Math.random() * 1000), published: false })
    // fire off the actual mutation
    this.apollo.mutate({
      mutation: SUBMIT_NEW_POST,
      variables: {
        objects: [
        {
          author_id: 1,
          title: someNewPost.title
          }
        ]
      },
    }).subscribe(({data}) => {
      console.log('got data:', data);
    }, (error) => {
      console.log('query made an error:', error);
    })

  }

}
