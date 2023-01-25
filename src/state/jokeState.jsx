import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

const jokeState = atom({
  key: "jokeState",
  default: { nice: [], bad: [] },
  effects_UNSTABLE: [persistAtom],
});

export default jokeState;
