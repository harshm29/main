export type Genratetoken = {
  status?: boolean;
  token?: any;
  type?: string;
  sessionId?: any;
  apikey?: any;
  consult_patient?: any;
  consult_docter?: any;
  genratetoken?: any;
};

export type session = {
  status?: boolean;
  message?: any;
  data?: any;
};

export type usermsg = {
  status?: boolean;
  message?: any;
  data?: any;
  total_pages?: any;
  current_page?: any;
  total_count?: any;
};
