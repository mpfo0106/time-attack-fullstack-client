import { Response } from "@/types/Response.type";

import { AxiosInstance } from "axios";
import { LogInDto, SignUpDto } from "./auth.dto";

class AuthAPI {
  private coreClient: AxiosInstance;

  constructor(coreClient: AxiosInstance) {
    this.coreClient = coreClient;
  }

  signUp = async (dto: SignUpDto) => {
    const response = await this.coreClient.post<Response>(
      "/auth/sign-up",
      dto,
      {}
    );
    const accessToken = response.data.result?.["accessToken"];

    return accessToken;
  };

  logIn = async (dto: LogInDto) => {
    const response = await this.coreClient.post<Response>(`/auth/log-in`, dto);
    const accessToken = response.data.result?.["accessToken"];

    return accessToken;
  };

  refresh = async () => {
    console.log(
      " this.coreClient in refresh",
      this.coreClient.defaults.headers.common
    );
    // const accessToken = localStorage.getItem("accessToken");
    const response = await this.coreClient.get<Response>(
      "/auth/refresh-token"
      // {
      //   headers: {
      //     Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      //   },
      // }
    );
    const newAccessToken = response.data?.result;

    return newAccessToken;
  };
}
export default AuthAPI;
