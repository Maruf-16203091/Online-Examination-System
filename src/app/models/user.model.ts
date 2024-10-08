export interface User {
  _id?: string;  // Optional because new users don't have an ID yet
  name: string;
  email: string;
  password?: string;  // Password might be optional when getting a user
  profileImage?: string;
  phone?: string;
  bio?: string;
  role?: string;
  blocked?: boolean;
  status?: string;
}
