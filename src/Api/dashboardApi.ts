import instance from "./api";

export const dashboardApi = () =>
  instance.get("/dashboard").then((res) => res.data);
