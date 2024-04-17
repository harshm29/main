import axios, { AxiosInstance } from "axios";
import { ProcessPayloadType } from "../types/user";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class PollService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  Getlist = (page: any, limit: any) => {
    return this.instance
      .get(`/poll/list?page=${page}&limit=${limit}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            data: res.data.data.polls,
            currentPage: res.data.data.currentPage,
            totalPages: res.data.data.totalPages,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  CreatePoll = (question: string, nominees: any) => {
    return this.instance
      .post(
        "/poll/create",
        { question, nominees },
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  ViewPoll = (id: any) => {
    return this.instance
      .get(`/poll/view/${id}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            data: res.data.data.poll,
            nominees: res.data.data.nominees,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };
}
