import { AuthService } from "./auth.service";

import { VoteService } from "./vote.service";
import { PollService } from "./poll.service";

let APIURL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:1500";

export const authService = new AuthService(APIURL);

export const authResendService = new AuthService(APIURL);
//

// register
export const authRegisterService = new AuthService(APIURL);

export const voteService = new VoteService(APIURL);
export const pollService = new PollService(APIURL);

export const socketurl = APIURL;
