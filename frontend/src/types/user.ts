export type User = {
  acknowledged?: boolean;
  modifiedCount?: number;
  id?: string;
  status?: boolean;
  message?: string;
  data?: any;
  currentPage?: any;
  totalPages?: any;
  nominees?: any;
  total_votes?: any;
};
export type Verified = {
  username?: string;
  expiredAt?: number;
  user?: object;
  accessToken?: string;
  avatar?: string;
  id?: string;
  type?: string;
  status?: boolean;
  message?: string;
};

export interface RegisterType {
  name: string;
  type: string;
  email: string;
  mobile: null;
  dob: Date;
  gender: string;
  password: string;
  otp: null;
  user_id: null;
  status: string;
  is_email_verified: string;
  verify_code: null;
  change_pass: null;
  sessionId: null;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProcessPayloadType {
  user_id: string;
  address: string;
  unit_number: string;
  postl_code: string;
  nric_text: string;
  drug: string;
  pre_exsit: string;
  token?: string;
  cardToken?: string;
}

export type Forgotpwd = {
  status?: boolean;
  message?: string;
  user_type?: string;
};

export type Userinfo = { status?: boolean; message?: string; data?: any };
