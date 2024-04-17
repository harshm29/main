import { voteService } from "../../services";
import Cookies from "js-cookie";
import { User, Verified } from "../../types/user";

export const useGetpoll = () => {
  const Getpoll = async () => {
    const poll: any = await voteService.Getpoll();

    return poll as User;
  };
  return { Getpoll };
};

export const useCreateVote = () => {
  const CreateVote = async (poll_id: string, nominee_id: string) => {
    const votecreate: any = await voteService.CreateVote(poll_id, nominee_id);

    return votecreate as User;
  };
  return { CreateVote };
};

export const useGetNomineesChart = () => {
  const GetNomineesChart = async () => {
    const Chart: any = await voteService.GetNomineesChart();

    return Chart as User;
  };
  return { GetNomineesChart };
};

export const useNomineesChartbyID = () => {
  const NomineesChartbyID = async (id: any) => {
    const Chartid: any = await voteService.GetNomineesChartbyID(id);

    return Chartid as User;
  };
  return { NomineesChartbyID };
};
