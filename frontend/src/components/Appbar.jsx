import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import userState from "../recoil/UserState";
import { useRecoilState } from "recoil";
import API_END_POINT from "../../utility";
import TextField from "@mui/material/TextField";
import Settings from "../common/settings";
import ConnectMetamask from "../common/ConnectMetamask";
import LoginModal from "./LoginModal";

function Appbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/admin/me`, {
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
          {/* <Button
            variant="contained"
            style={{
              width: 100,
              backgroundColor: "white",
              color: "#2874f0",
              height: "40px",
              fontWeight: "700",
            }}
            disableElevation
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button> */}
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
