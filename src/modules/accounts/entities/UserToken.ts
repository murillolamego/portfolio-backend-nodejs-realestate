class UserToken {
  id?: string;
  refreshToken: string;
  expires: Date;
  userId: string;
  createdAt?: Date;
}
export { UserToken };
