export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
}
