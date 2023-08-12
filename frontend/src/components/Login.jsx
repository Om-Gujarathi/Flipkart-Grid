import { Avatar, Card, IconButton, InputLabel } from "@mui/material";
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
import Divider from "@mui/material/Divider";
import { VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        width: "750px",
        height: "700px",
        marginLeft: "25%",
        marginTop: "10%",
      }}
    >
      <Card style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "white", // #2874f0
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
            marginTop: "40px",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: 500,
              color: "#2874f0",
            }}
          >
            Login
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              marginTop: "20px",
              maxWidth: "150px",
            }}
          >
            Get access to your Orders, Wishlist and Recommendations
          </Typography>

          <Avatar
            variant="circular"
            alt="Remy Sharp"
            src="/login.jpg"
            style={{
              width: 300,
              height: 300,
              marginTop: "20px",
            }}
          ></Avatar>
        </div>
        <Divider orientation="vertical" flexItem variant="middle" />
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            padding: 30,
            width: "100%",
          }}
        >
          <TextField
            label="Enter Email"
            variant="standard"
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            fullWidth
          />
          <FormControl sx={{}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography
            variant="caption"
            style={{
              marginTop: "20px",
            }}
          >
            By continuing, you agree to ShopKart's Terms of Use and Privacy
            Policy.
          </Typography>
          <Button
            size="large"
            variant="contained"
            style={{
              backgroundColor: "#FB641B",
              borderRadius: "0px",
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
            Continue
          </Button>
          <Typography
            variant="subtitle2"
            style={{
              marginTop: "auto",
              alignSelf: "center",
              color: "#2874F0",
            }}
          >
            New to ShopKart? Create an account
          </Typography>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Wrong Credentials!
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
}

export default Login;
