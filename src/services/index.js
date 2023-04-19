import BasicAxios from "../helpers/axios/BasicAxios";
import SanctumAxios from "../helpers/axios/SanctumAxios";

export const csrf = async () => {
  const token = await SanctumAxios.get("/sanctum/csrf-cookie");
  return token;
};
