import { IAccount } from "../../entities";

export type Token = string;
export type RegisterParams = Pick<
  IAccount,
  "email" | "firstName" | "lastName" | "password"
>;
export type LoginParams = {
  isRememberMe: boolean;
} & Pick<IAccount, "email" | "password">;

export type AuthenticationResponse = {
  message: string;
  token: Token;
  refreshToken: Token;
};
export type RefreshTokenResponse = {
  message: string;
  token: Token;
};
