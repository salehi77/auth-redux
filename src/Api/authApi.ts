import instance from "./api";

export const loginApi = (body: { email: string; password: string }) =>
  instance.post("/auth/signin", body).then((res) => res.data);

export const signupApi = (body: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => instance.post("/auth/signup", body).then((res) => res.data);
