import { Card, Divider, Typography } from "@mui/material";
import React from "react";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";

const coins = [
  {
    date: "Thursday, Aug 10, 2023, 09:00 PM",
    points: 1,
    description: "Completed a daily check-in mission",
  },
  {
    date: "Monday, Aug 7, 2023, 10:03 PM",
    points: 10,
    description: "Purchased a Product",
  },
  {
    date: "Thursday, Aug 10, 2023, 09:00 PM",
    points: 1,
    description: "Completed a daily check-in mission",
  },
];

function Points() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Typography variant="h4" style={{ marginBottom: "100px" }}>
          Your Points Activity
        </Typography>
        {coins.map((coin) => {
          return <Coin coin={coin}></Coin>;
        })}
      </div>
    </div>
  );
}

function Coin({ coin }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <Typography
        variant="subtitle2"
        style={{
          marginBottom: "10px",
        }}
      >
        {coin.date}
      </Typography>
      <Card
        sx={{
          width: "800px",
          height: "200px",
          display: "flex",
        }}
      >
        <div>
          <CurrencyFrancIcon />
          <Typography>+{coin.points} </Typography>
        </div>
        <div>
          <Divider orientation="vertical" />
          <Typography>{coin.description}</Typography>
        </div>
      </Card>
    </div>
  );
}

export default Points;
