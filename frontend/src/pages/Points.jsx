import { Card, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TollIcon from "@mui/icons-material/Toll";
import axios from "axios";
import API_END_POINT from "../../utility";
import { useSetRecoilState } from "recoil";
import backdropState from "../recoil/BackDropState";

function Points() {
  const [history, setHistory] = useState(null);
  const setBackDrop = useSetRecoilState(backdropState);
  useEffect(() => {
    axios
      .post(
        `${API_END_POINT}/users/transactionHistory`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.history);
        setHistory(res.data.history);
      })
      .catch((err) => {
        // setUsername("");
      });
  }, []);
  if (history == null) {
    setBackDrop(true);
    return <div></div>;
  }
  let num = 0;
  setBackDrop(false);
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
        {history.map((trx) => {
          return <Coin value={trx.value} key={num++}></Coin>;
          // return <div></div>;
        })}
      </div>
    </div>
  );
}

function Coin({ value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <Card
        sx={{
          width: "800px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <TollIcon />
          <Typography>+{value} </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Points;
