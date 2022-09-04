import { atom } from "recoil";

const oneUserState = atom({
  key: "userInfoState",
  default: "",
});

export default oneUserState;
