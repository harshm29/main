import axios, { AxiosInstance } from "axios";
import { ProcessPayloadType } from "../types/user";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class VoteService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  Getpoll = () => {
    return this.instance
      .get("/poll-info", {
        headers: getAuthorizationHeader(),
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            data: res.data.data,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  CreateVote = (poll_id: string, nominee_id: string) => {
    return this.instance
      .post(
        "/create-vote",
        { poll_id, nominee_id },
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

  GetNomineesChart = () => {
    return this.instance
      .get("/poll/nominees-chart", {
        headers: getAuthorizationHeader(),
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            data: res.data.data,
            total_votes: res.data.total_votes,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  GetNomineesChartbyID = (id: any) => {
    return this.instance
      .get(`/poll/nominees-chart-id/${id}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            data: res.data.data,
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
