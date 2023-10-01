// Importing necessary constants
import { COOKIE_KEY } from "../../../../configs/constants";
import { TOKEN_EXPIRY_DAYS } from "../../constants";
// Importing authentication context
import { useAuthContext } from "../context";
// Importing cookie helper functions
import { deleteCookie, getCookie, setCookie } from "../helper/cookieHelper";
// Importing local storage helper functions
import {
  getIsRememberMeLocalStorage,
  setIsRememberMeLocalStorage,
  removeIsRememberMeLocalStorage,
} from "../helper/localStorageHelper";
// Importing session storage helper functions
import {
  setAccessTokenSessionStorage,
  getAccessTokenSessionStorage,
  removeAccessTokenSessionStorage,
} from "../helper/sessionStorageHelper";

type AccessTokenHook = {
  getToken: () => string | null;
  setToken: (newToken: string, isRememberMe: boolean) => void;
  resetToken: (newToken: string) => void;
  deleteToken: () => void;
};

// Function to get the token
export const getToken = (): string | null => {
  // Checking if the user has chosen to be remembered
  const isRememberMe: boolean | null = getIsRememberMeLocalStorage();
  if (isRememberMe) {
    return getCookie(COOKIE_KEY.ACCESS_TOKEN);
  } else {
    // Otherwise, get the token from the session storage
    return getAccessTokenSessionStorage();
  }
};

export const useAccessToken = (): AccessTokenHook => {
  // Getting the dispatch function from the authentication context
  const { dispatch } = useAuthContext();

  // Function to set the token
  const setToken = (newToken: string, isRememberMe: boolean): void => {
    if (isRememberMe) {
      // If the user has chosen to be remembered, save the token to the cookies
      setCookie(COOKIE_KEY.ACCESS_TOKEN, newToken, TOKEN_EXPIRY_DAYS.REMEMBER);
    } else {
      // Otherwise, save the token to the session storage
      setAccessTokenSessionStorage(newToken);
    }
    // Save the remember me option to the local storage
    setIsRememberMeLocalStorage(isRememberMe);
    // Dispatch the new token to the context
    dispatch({
      type: "SET_ACTION",
      payload: newToken,
    });
  };

  // Function to reset the token
  const resetToken = (newToken: string): void => {
    // Checking if the user has chosen to be remembered
    const isRememberMe: boolean | null = getIsRememberMeLocalStorage();
    if (isRememberMe) {
      // If so, save the new token to the cookies
      setCookie(COOKIE_KEY.ACCESS_TOKEN, newToken, TOKEN_EXPIRY_DAYS.REMEMBER);
    } else {
      // Otherwise, save the new token to the session storage
      setAccessTokenSessionStorage(newToken);
    }
    // Dispatch the new token to the context
    dispatch({
      type: "SET_ACTION",
      payload: newToken,
    });
  };

  // Function to delete the token
  const deleteToken = (): void => {
    // Checking if the user has chosen to be remembered
    const isRememberMe = getIsRememberMeLocalStorage();
    if (isRememberMe) {
      // If so, delete the token from the cookies
      deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    } else {
      // Otherwise, remove the token from the session storage
      removeAccessTokenSessionStorage();
    }
    // Remove the remember me option from the local storage
    removeIsRememberMeLocalStorage();
    // Remove the token from the context
    dispatch({
      type: "SET_ACTION",
      payload: null,
    });
  };

  // Returning the hook functions
  return {
    getToken,
    setToken,
    resetToken,
    deleteToken,
  };
};
