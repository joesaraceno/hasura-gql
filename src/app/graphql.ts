import { Author, Post } from './types';
import gql from 'graphql-tag'

// TODO: move the component folders

// TODO: make this query respect some order on internal key(or our own timestamp key, I guess)?
export const SUBSCRIBE_TO_POSTS = gql`
  subscription {
    posts(order_by: { created_at: desc }) {
      id
      published
      title
      author { id, name }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      published
      author { id, name }
    }
  }
`;
export interface AllPostsQueryResponse {
  allPosts: Post[];
  loading: boolean;
}

export const QUERY_ALL_AUTHORS = gql`
  query Users {
    users {
      id
      name
    }
  }
`;
export interface AllAuthorsQueryResponse {
  allAuthors: Author[];
  loading: boolean;
}

export const SUBMIT_NEW_POST = gql`
  mutation insert_post($objects:[posts_insert_input!]!) {
    insert_posts(objects: $objects) {
      returning {
        id,
        title,
        published,
        author {id, name}
      }
    }
  }
`;
export interface SubmitPostMutationResponse {
  createPost: Post;
  loading: boolean;
}

export const MUTATE_POST_PUBLISHED = gql`
  mutation update_posts($id:Int,$changes:posts_set_input) {
    update_posts(
      where: {id: {_eq: $id}},
      _set: $changes
    ) {
      affected_rows
      returning {
        id,
        title,
        published,
        author ,
          {id, name}
      }
    }
  }
`;
