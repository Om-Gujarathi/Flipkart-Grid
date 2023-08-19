import React from "react";
import { useRecoilValue } from "recoil";
import walletState from "../recoil/WalletState";
import { Card, Typography } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";

function WalletButton() {
  const wallet = useRecoilValue(walletState);
  return (
    <Card
      sx={{
        display: "flex",
        background: "#FB641B",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <TollIcon
        sx={{
          color: "white",
        }}
      ></TollIcon>
      <Typography>{wallet.displayValue}</Typography>
    </Card>
  );
}

export default WalletButton;
