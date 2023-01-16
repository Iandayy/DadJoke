import { selector } from "recoil";

import axios from "axios";

const jokeState = selector({
  key: "jokeState",
  get: async () => {
    try {
      const config = { headers: { Accept: "application/json" } };
      const res = await axios.get(process.env.REACT_APP_JOKE_URL, config);
      return res.data.joke;
    } catch {
      return "No Joke";
    }
  },
});

export default jokeState;
