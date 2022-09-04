import { selectorFamily } from "recoil";

import axios from "axios";

const userInfoState = selectorFamily({
  key: "userInfoState",
  get: (id) => async () => {
    const res = await axios.get(`http://localhost:3001/userInfo/${id}`);
    return res.data;
  },
});

export default userInfoState;
