import { selector } from "recoil";

import axios from "axios";

const usersAllState = selector({
  key: "usersAllState",
  get: async () => {
    const res = await axios.get("http://localhost:8080/userInfo");
    return res.data;
  },
});

export default usersAllState;
