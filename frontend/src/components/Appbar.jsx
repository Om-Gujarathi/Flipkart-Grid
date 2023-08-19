import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import userState from "../recoil/UserState";
import { useRecoilState } from "recoil";
import API_END_POINT from "../../utility";
import TextField from "@mui/material/TextField";
import ConnectMetamask from "../common/ConnectMetamask";
import LoginModal from "./LoginModal";
import Settings from "../common/Settings";

function Appbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.username) {
          setUsername(res.data.username);
        }
      })
      .catch((err) => {
        setUsername("");
      });
  }, []);
  if (username === null) {
    return <div></div>;
  }
  if (username === "") {
    return (
      <div
        style={{
          backgroundColor: "#2874f0",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#2874f0",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            style={{
              color: "white",
            }}
            onClick={() => {
              console.log("hi");
              navigate("/");
            }}
          >
            ShopKart
          </Typography>

          <TextField
            style={{
              backgroundColor: "white",
              width: "500px",
              height: "40px",
            }}
            hiddenLabel
            id="filled-hidden-label-small"
            label="Search for Products"
            variant="filled"
            size="small"
          />
          <LoginModal></LoginModal>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#2874f0",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "#2874f0",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: "white",
            marginTop: "4px",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          ShopKart
        </Typography>

        <TextField
          style={{
            backgroundColor: "white",
            width: "500px",
            height: "40px",
          }}
          hiddenLabel
          id="filled-hidden-label-small"
          label="Search for Products"
          variant="filled"
          size="small"
        />
        <ConnectMetamask></ConnectMetamask>
        <Settings></Settings>
      </div>
    </div>
  );
}

export default Appbar;
