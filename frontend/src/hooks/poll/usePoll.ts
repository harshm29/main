import { pollService } from "../../services";
import Cookies from "js-cookie";
import { User, Verified } from "../../types/user";

export const useGetlist = () => {
  const Getlist = async (page: any, limit: any) => {
    const poll: any = await pollService.Getlist(page, limit);

    return poll as User;
  };
  return { Getlist };
};

export const useCreatePoll = () => {
  const CreatePoll = async (question: string, nominees: any) => {
    const CreatePolls: any = await pollService.CreatePoll(question, nominees);

    return CreatePolls as User;
  };
  return { CreatePoll };
};

export const useViewPoll = () => {
  const ViewPoll = async (id: any) => {
    const mypoll: any = await pollService.ViewPoll(id);

    return mypoll as User;
  };
  return { ViewPoll };
};
