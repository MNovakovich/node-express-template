export type CreatePostDto = {
  id?: number;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  active?: boolean;
};
