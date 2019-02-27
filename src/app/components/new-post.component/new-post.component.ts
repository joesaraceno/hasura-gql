import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
// import gql from 'graphql-tag';
import { Author, Post } from '../../types';
import { ALL_AUTHORS_QUERY, NEW_POST_SUBMIT, ALL_POSTS_QUERY } from 'src/app/graphql';

// interface Author {
//   id: number;
//   name: string;
// }

// interface Post {
//   // id: number;
//   title: string;
//   published: boolean;
// }

interface Response {
  users: Author[];
}


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


// // TODO: put this in some data service
// const subscription = gql`
//   query Users {
//     users {
//       id
//       name
//     }
//   }
// `;


// // TODO: put this in some data service
// const submitPost = gql`
//   mutation insert_post($objects:[posts_insert_input!]!) {
//   insert_posts(objects: $objects) {
//     returning {
//       id,
//       title,
//       author {id, name}
//     }
//   }
// }
// `

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  authorsSubscription: Subscription;
  authors: Author[];
  loading = true;
  submitting = false;
  error: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<Response>({
      query: ALL_AUTHORS_QUERY
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.authors = data.users;
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
    console.log('submitting Post...')
    // just to generate the dummy post
    let someNewPost = newPost({ title: 'goodbye-' + Math.floor(Math.random() * 1000), published: false })
    console.log(someNewPost);
    // fire off the actual mutation
    this.apollo.mutate({
      mutation: NEW_POST_SUBMIT,
      variables: {
        objects: [
        {
          author_id: 1,
          title: someNewPost.title
          }
        ]
      },
      refetchQueries:[{
        query: ALL_POSTS_QUERY,
      }]
      // update: (store, { data: { insert_post } }) => {
      //   const data: any = store.readQuery({
      //     query: ALL_POSTS_QUERY
      //   });
      //   // TODO: figure out how to access the right element in the store
      //   data.posts.push(insert_post);
      //   store.writeQuery({ query: ALL_POSTS_QUERY, data })
      // }
    }).subscribe(({data}) => {
      console.log('got data:', data);
    }, (error) => {
      console.log('query made an error:', error);
    })

  }

}
