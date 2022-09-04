import { atom } from "recoil";

const listPageState = atom({
  key: "listPageState",
  default: {
    nice: 1,
    bad: 1,
  },
});

export default listPageState;
