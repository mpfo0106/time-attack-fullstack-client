import { Response } from "@/types/Response.type";

import { AxiosInstance } from "axios";
import { CreateDealDto } from "./deal.dto";
import { GetProductData, GetProductsData, PostProductData } from "./deals.data";

class DealAPI {
  private coreClient: AxiosInstance;

  constructor(coreClient: AxiosInstance) {
    this.coreClient = coreClient;
  }

  createDeal = async (dto: CreateDealDto) => {
    const response = await this.coreClient.post<Response<PostProductData>>(
      "/deal/create",
      dto
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);
    const deal = data.result;

    return deal;
  };

  getDeals = async () => {
    const response = await this.coreClient.get<Response<GetProductsData>>(
      "/deals"
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deals = data.result;

    return deals;
  };

  getDeal = async (dealId: string) => {
    const response = await this.coreClient.get<Response<GetProductData>>(
      `/deals/${dealId}`
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deal = data.result;

    return deal;
  };

  getMyWrote = async () => {
    const response = await this.coreClient.get<Response<GetProductsData>>(
      "/my/deals/written"
    );
    console.log(222);
    console.log(response);
    console.log(111);
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deals = data.result;

    return deals;
  };

  postImage = async (formData: FormData) => {
    const data = await this.coreClient.post("deals/image", formData);
    const fileImgUrl = data["data"]["result"];

    return fileImgUrl;
  };
}

export default DealAPI;
