export interface User {
  _id?: string;  
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  phone?: string;
  bio?: string;
  role?: string;
  blocked?: boolean;
  status?: string;
}
