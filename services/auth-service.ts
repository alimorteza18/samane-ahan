import {
  FetchUserProfileProps,
  GetLoginOTPProps,
  getLoginOTPReturn,
  LoginProps,
  LoginReturn,
} from "@/types/services";
import { AxiosResponse } from "axios";
import http from "./http-service";

const client_secret = "r3kSVQJl19v7uxQBAevilI8AsamRoClGBWm92tcY";
const client_id = "2";
const app_type = "group_chat";
const app_version = "beta-01";
const device_id = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36" //prettier-ignore

type SendLoginOTP = (
  data?: GetLoginOTPProps
) => Promise<AxiosResponse<getLoginOTPReturn>>;

export const sendLoginOTP: SendLoginOTP = (data) => http.post("otp", data);

export const login = (data: LoginProps): Promise<AxiosResponse<LoginReturn>> =>
  http.post("login", {
    client_secret,
    client_id,
    app_type,
    app_version,
    device_id,
    ...data,
    grant_type: data.grant_type ?? "password",
  });

export const fetchUserProfile = (props?: FetchUserProfileProps) => {
  if (props?.access_token) {
    return http.get("profile", {
      headers: { Authorization: `Bearer ${props?.access_token}` },
    });
  } else {
    return http.get("profile");
  }
};

export const editUserProfile = (data: any) => http.put(`profile/user`, data);

type LoginAdminService = (data: {
  username: string;
  password: string;
}) => Promise<AxiosResponse>;

export const loginAdmin: LoginAdminService = (data) =>
  http.put("admin/login", data);
