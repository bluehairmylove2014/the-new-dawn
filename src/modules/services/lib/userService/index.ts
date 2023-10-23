import { getUserUrl } from "../../config/apis";
import { Services } from "../../service";
import { getUserResponseSchema } from "./schema";
import { getUserResponse } from "./type";

export * from "./type";
export class UserService extends Services {
  abortController?: AbortController;

  getUser = async (token: string | null): Promise<getUserResponse> => {
    this.abortController = new AbortController();
    try {
      if (!token) return undefined;
      const response = await this.fetchApi<
        typeof getUserResponseSchema,
        getUserResponse
      >({
        method: "GET",
        url: getUserUrl,
        schema: getUserResponseSchema,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
