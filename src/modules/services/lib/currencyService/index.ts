import { AxiosResponse } from "axios";
import { getAxiosNormalInstance } from "../../config/axios";
import { Services } from "../../service";
import {
  exchangeratesGetLatestPath,
  exchangeratesapi,
} from "../../config/apis";
import {
  GetCurrencyRateServerResponse,
  GetCurrencyRateServiceResponse,
} from "./type";

export class CurrencyService extends Services {
  abortController?: AbortController;
  // exAccessKey = process.env.NEXT_PUBLIC_CURRENCY_ACCESS_KEY;
  exAccessKey = "eacb396bec698225119e267b30eac2ae";

  // GOOGLE LOGIN
  getCurrencyRate = async ({
    format,
  }: {
    format: string;
  }): Promise<GetCurrencyRateServiceResponse> => {
    this.abortController = new AbortController();
    try {
      console.log("SEND: ", exchangeratesapi + exchangeratesGetLatestPath);
      const response: AxiosResponse<GetCurrencyRateServerResponse> =
        await getAxiosNormalInstance().get(exchangeratesGetLatestPath, {
          baseURL: exchangeratesapi,
          signal: this.abortController.signal,
          params: {
            access_key: this.exAccessKey,
            symbols: "USD,VND",
            base: "EUR",
          },
        });
      console.log("response: ", response);
      if (response.data.success) {
        return {
          date: response.data.date,
          rates: response.data.rates,
        };
      } else {
        throw new Error("Error getCurrencyRate success false");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
