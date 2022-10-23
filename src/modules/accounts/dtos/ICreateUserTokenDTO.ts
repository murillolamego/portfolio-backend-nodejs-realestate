interface ICreateUserTokenDTO {
  refreshToken: string;
  expires: Date;
  userId: string;
}
export { ICreateUserTokenDTO };
