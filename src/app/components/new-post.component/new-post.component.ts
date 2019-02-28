import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Author, Post } from '../../types';
import { QUERY_ALL_AUTHORS, SUBMIT_NEW_POST } from 'src/app/graphql';

// TODO: remove this once we put in forms
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
export class NewPostComponent implements OnInit, OnDestroy {
  authorsSubscription: QueryRef<Author[]>;
  authors: Author[];
  loading = true;
  submitting = false;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {

    // set the initial queryRef
    this.authorsSubscription = this.apollo.watchQuery({
      query: QUERY_ALL_AUTHORS
    });

    // use the queryRef to make a query, subscribe to the Observable inside of valueChanges
    // when the valueChanges event happens, result will have the data
    this.authorsSubscription.valueChanges.subscribe((result) => {
      this.authors = result.data;
      this.loading = false;
      setTimeout(() => {
        this.submitting = true;
        // TODO: remove this when we put in forms
        // fire off a random submit post
        // this.submitPost();
      }, 4 * 1000)
    });
  }

  ngOnDestroy() {
    // TODO: unsubscribe?
    // this.authorsSubscription.unsubscribe();
  }

  submitPost() {
    // TODO: put in forms so we're relying on this automatic post
    // just to generate the dummy post
    let someNewPost = newPost({ title: 'newPost-' + Math.floor(Math.random() * 1000), published: false })
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
    }).subscribe(( { data } ) => {
      console.log('got data:', data);
    }, error => {
      console.log('query made an error:', error);
    });
  }

};
