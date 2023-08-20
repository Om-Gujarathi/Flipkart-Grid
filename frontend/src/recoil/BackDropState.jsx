import { atom } from "recoil";

const backdropState = atom({
  key: "backDropState",
  default: false,
});

export default backdropState;
