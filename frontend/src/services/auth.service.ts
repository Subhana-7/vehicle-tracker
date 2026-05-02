import axios from "axios";
import { AUTH_ROUTES } from "../constants/routes";

const API = import.meta.env.VITE_SERVER_URL;

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API}${AUTH_ROUTES.base}${AUTH_ROUTES.signup}`, data);
  return res.data;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const res = await axios.post(`${API}${AUTH_ROUTES.base}${AUTH_ROUTES.verifyOtp}`, data);
  return res.data;
};

export const resendOtp = async (email: string) => {
  const res = await axios.post(`${API}${AUTH_ROUTES.base}${AUTH_ROUTES.resendOtp}`, { email });
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API}${AUTH_ROUTES.base}${AUTH_ROUTES.login}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${API}${AUTH_ROUTES.base}${AUTH_ROUTES.logout}`,
    {},
    { withCredentials: true },
  );
  return res.data;
};
