import { selector } from "recoil";

import instance from "../service/request";

const usersAllState = selector({
  key: "usersAllState",
  get: async () => {
    const res = await instance.get("/");
    return res.data;
  },
});

export default usersAllState;
