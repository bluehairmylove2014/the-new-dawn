import { SESSION_STORAGE_KEY } from "../../../../configs/constants";

// Access token
export const setAccessTokenSessionStorage = (token: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, token);
  }
};

export const getAccessTokenSessionStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  }
  return null;
};

export const removeAccessTokenSessionStorage = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  }
};

// Refresh token
export const setRefreshTokenSessionStorage = (refreshToken: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
  }
};

export const getRefreshTokenSessionStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(SESSION_STORAGE_KEY.REFRESH_TOKEN);
  }
  return null;
};

export const removeRefreshTokenSessionStorage = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.REFRESH_TOKEN);
  }
};
