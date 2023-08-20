import React from "react";
import { useRecoilValue } from "recoil";
import walletState from "../recoil/WalletState";
import { Card, Typography } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";

function WalletButton() {
  const wallet = useRecoilValue(walletState);
  if (wallet == null) {
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
            color: "black",
            marginRight: "5px",
          }}
        ></TollIcon>
        <Typography
          sx={{
            color: "white",
          }}
        >
          --
        </Typography>
      </Card>
    );
  }
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
          color: "black",
          marginRight: "5px",
        }}
      ></TollIcon>
      <Typography
        sx={{
          color: "white",
        }}
      >
        {wallet}
      </Typography>
    </Card>
  );
}

export default WalletButton;
