import { Author, Post } from './types';
import gql from 'graphql-tag'

export const POST_SUBSCRIPTION = gql`
subscription {
  posts {
    id
    published
    title
    author { id, name }
  }
}
`;

export const ALL_POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
      published
      author { id, name }
    }
  }
`;
export interface AllPostQueryResponse {
  allPosts: Post[];
  loading: boolean;
}

export const ALL_AUTHORS_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;
export interface AllAuthorQueryResponse {
  allAuthors: Author[];
  loading: boolean;
}


// TODO: make a return interface for this mutation's `returning` field
export const NEW_POST_SUBMIT = gql`
  mutation insert_post($objects:[posts_insert_input!]!) {
  insert_posts(objects: $objects) {
    returning {
      id,
      title,
      author {id, name}
    }
  }
}
`;
export interface CreatePostMutationResponse {
  createPost: Post;
  loading: boolean;
}
