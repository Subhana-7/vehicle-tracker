import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API}/auth/signup`, data);
  return res.data;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const res = await axios.post(`${API}/auth/verify-otp`, data);
  return res.data;
};

export const resendOtp = async (email: string) => {
  const res = await axios.post(`${API}/auth/resend-otp`, { email });
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${API}/auth/logout`,
    {},
    { withCredentials: true },
  );
  return res.data;
};
