class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  admin = false;
  createdAt: Date;
  updatedAt: Date;
}
export { User };
