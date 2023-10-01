import { isDevelopment } from "./axios";
import { authServiceConfig } from "./config";

const serverApi = "https://sunrise-hotel.azurewebsites.net/api";
const localApi = "http://localhost:3000/api";

export const getApiUrl = (isProduction?: boolean) => {
  return isProduction
    ? serverApi
    : isDevelopment() && authServiceConfig.isMockApi
    ? localApi
    : serverApi;
};
