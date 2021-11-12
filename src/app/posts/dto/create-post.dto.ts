export type CreatePostDto = {
  id?: number;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  active?: boolean;
};
