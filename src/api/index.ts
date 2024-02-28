import axios from "axios";
import AuthAPI from "./auth.api/auth.api";
import DealAPI from "./deals.api/deals.api";

const coreClient = axios.create({
  baseURL: "http://localhost:5050",
});

class API {
  static auth = new AuthAPI(coreClient);
  static deal = new DealAPI(coreClient);

  static setAccessToken(accessToken: string) {
    coreClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  static removeAccessToken() {
    coreClient.defaults.headers.common.Authorization = "";
  }
}

export default API;
