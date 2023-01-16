import { selectorFamily } from "recoil";

import instance from "../service/request";

const userInfoState = selectorFamily({
  key: "userInfoState",
  get: (id) => async () => {
    try {
      const res = await instance.get(`/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default userInfoState;
