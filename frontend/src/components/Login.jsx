import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { useSetRecoilState } from "recoil";
import userState from "../recoil/UserState";
import { useNavigate } from "react-router-dom";
import API_END_POINT from "../../utility";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const setUsername = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <center>
      <div>
        <div
          style={{
            marginTop: 100,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Please Log in to continue
          </Typography>
          <br />
        </div>
        <Card
          variant="outlined"
          style={{
            width: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 20,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <TextField
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <Button
              variant="contained"
              style={{
                maxWidth: 100,
              }}
              onClick={() => {
                fetch(`${API_END_POINT}/admin/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    username: email,
                    password: password,
                  },
                })
                  .then((res) => {
                    if (res.status == 400) {
                      return handleClick();
                    } else {
                      return res.json();
                    }
                  })
                  .then((data) => {
                    if (data) {
                      navigate("/");
                      localStorage.setItem("token", data.token);
                      setUsername(email);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Log in
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Wrong Credentials!
              </Alert>
            </Snackbar>
          </div>
        </Card>
      </div>
    </center>
  );
}

export default Login;
