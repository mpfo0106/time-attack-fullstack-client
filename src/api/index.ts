import axios from "axios";
import AuthAPI from "./auth.api/auth.api";
import DealAPI from "./deals.api/deals.api";

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null; //여권을 가지고 있으면, 시작부터 묻혀

const coreClient = axios.create({
  baseURL: "http://localhost:5050",
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined, //있으면 베어러. 없으면 undefined
  },
});

class API {
  static auth = new AuthAPI(coreClient);
  static deal = new DealAPI(coreClient);

  static setAccessToken(accessToken: string) {
    coreClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem("accessToken", accessToken);
  }

  static removeAccessToken() {
    coreClient.defaults.headers.common.Authorization = "";
    localStorage.removeItem("accessToken");
  }
}

export default API;
