export class Author {
  id?: number;
  name: string;
}

export class Post {
  id?: number;
  title: string;
  published: boolean;
  author?: string | Author;
}
