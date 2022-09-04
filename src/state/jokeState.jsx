import { selector } from "recoil";

import axios from "axios";

const jokeState = selector({
  key: "jokeState",
  get: async () => {
    try {
      const config = { headers: { Accept: "application/json" } };
      const res = await axios.get("https://icanhazdadjoke.com/", config);
      return res.data.joke;
    } catch {
      return "No Joke";
    }
  },
});

export default jokeState;
