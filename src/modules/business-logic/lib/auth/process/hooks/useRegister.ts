// Import necessary modules and hooks
import {
  AuthenticationResponse,
  RegisterParams,
} from "../../../../../services";
import { BROADCAST_MESSAGE } from "../../constants";
import { useRegisterMutation } from "../../fetching/mutation";
import { useAccessToken } from "./useAccessToken";
import { useAuthBroadcastChannel } from "./useAuthBroadcastChannel";
import { useHandleRefreshToken } from "./useHandleRefreshToken";

const isRememberMeDefault = false;
type UseRegisterType = {
  onRegister: (params: RegisterParams) => Promise<string>;
  isLoading: boolean;
};
export const useRegister = (): UseRegisterType => {
  const { postMessage } = useAuthBroadcastChannel();
  const { setToken } = useAccessToken();
  const { setRefreshToken } = useHandleRefreshToken();
  // Define mutation for register function with retry and success/error handlers
  const registerMutation = useRegisterMutation();

  // Define onRegister function to handle registration
  const onRegister = (params: RegisterParams): Promise<string> => {
    return new Promise((resolve, reject) => {
      registerMutation
        .mutateAsync(params)
        .then((response: AuthenticationResponse) => {
          // On success, if token is present, store it in session storage and update context

          if (response.token) {
            setToken(response.token, isRememberMeDefault);
            setRefreshToken(response.refreshToken, isRememberMeDefault);
            postMessage({
              message: BROADCAST_MESSAGE.SEND_TOKEN,
              token: response.token,
              refreshToken: response.refreshToken,
              isRemember: isRememberMeDefault,
            });
            resolve(response.message);
          } else {
            reject(new Error(response.message));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Return onRegister function and loading status
  return {
    onRegister,
    isLoading: registerMutation.isLoading,
  };
};
