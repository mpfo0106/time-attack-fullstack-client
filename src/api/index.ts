import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api/auth.api";
import DealAPI from "./deals.api/deals.api";

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null; //여권을 가지고 있으면, 시작부터 묻혀

class API {
  coreClient: AxiosInstance;
  auth: AuthAPI;
  deal: DealAPI;

  constructor() {
    this.coreClient = axios.create({ baseURL: "http://localhost:5050" });
    this.auth = new AuthAPI(this.coreClient);
    this.deal = new DealAPI(this.coreClient);

    if (accessToken) this.setAccessToken(accessToken);
  }

  setAccessToken(accessToken: string) {
    this.coreClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    localStorage.setItem("accessToken", accessToken);
  }

  removeAccessToken() {
    this.coreClient.defaults.headers.common.Authorization = "";
    localStorage.removeItem("accessToken");
  }
}

const api = new API();
export default api;
