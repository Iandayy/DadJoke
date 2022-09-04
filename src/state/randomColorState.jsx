import { atom } from "recoil";

const randomColor = atom({
  key: "randomColor",
  default: "black",
});

export default randomColor;
