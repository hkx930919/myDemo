import { request } from "@/utils/http";

export default {
  getToken: data => request.get("/sts", data)
};
