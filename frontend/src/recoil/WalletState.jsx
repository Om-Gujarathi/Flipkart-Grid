import { atom } from "recoil";

const walletState = atom({
  key: "walletState",
  default: null,
});

export default walletState;
