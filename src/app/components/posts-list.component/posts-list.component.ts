import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Post } from '../../types';
import { QUERY_ALL_POSTS, SUBSCRIBE_TO_POSTS, MUTATE_POST_PUBLISHED } from '../../graphql';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  postsQuery: QueryRef<Post[]>;
  posts: Post[];
  postToPublish: Post;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.postsQuery = this.apollo.watchQuery({
      query: QUERY_ALL_POSTS
    });

    this.postsQuery.valueChanges.subscribe((result) => {
      this.posts = result.data['posts'];
    });

    // TODO: make this respect some sort of order
    this.postsQuery.subscribeToMore({
      document: SUBSCRIBE_TO_POSTS,
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data) {
          return prev;
        }
        return subscriptionData.data;
      }
    });
  }

  publishExistingPost(index) {
    this.postToPublish = this.posts[index];
    console.log(this.postToPublish);
    this.submitPublishPost();
  }

  submitPublishPost() {
    if (!this.postToPublish) {
      return console.log('no post selected');
    }
    console.log('Post was:', this.postToPublish.published ? 'Published' : 'Not Published');
    this.apollo.mutate({
      mutation: MUTATE_POST_PUBLISHED,
      variables: {
        "id": this.postToPublish.id,
        "changes": {
          "published": this.postToPublish.published
        }
      },
    }).subscribe(( { data } ) => {
      console.log('mutation successful published:', data);
      console.log('Post is:', this.postToPublish.published ? 'Published' : 'Not Published');
    }, error => {
      console.log('mutation made an error:', error);
    });
  }

  ngOnDestroy() {
    // TODO: unsubscribe at some point?
    // this.postsQuery.unsubscribe();
  }
}

