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
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [newUser, setNewUser] = useState(false);

  if (!newUser) {
    return <LoginForm setNewUser={setNewUser}></LoginForm>;
  } else {
    return <SignUpForm setNewUser={setNewUser}></SignUpForm>;
  }
}

function LoginForm({ setNewUser }) {
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
        maxHeight: "700px",
        margin: "auto",
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        bottom: 0,
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
              fetch(`${API_END_POINT}/users/login`, {
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
            onClick={() => {
              setNewUser(true);
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

function SignUpForm({ setNewUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
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
        margin: "auto",
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        bottom: 0,
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
            Looks like you're new here!
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              marginTop: "20px",
              maxWidth: "150px",
            }}
          >
            Sign up with your email to get started.
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
          <FormControl sx={{}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Re-Type Password
            </InputLabel>
            <Input
              onChange={(e) => {
                setRepeatPassword(e.target.value);
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
            onClick={async () => {
              await axios
                .post(`${API_END_POINT}/users/signup`, {
                  username: email,
                  password: password,
                })
                .then((res) => {
                  if (res.status == 400) {
                    console.log("ERROR");
                  } else {
                    setNewUser(false);
                  }
                });
            }}
          >
            Create Account
          </Button>
          <Typography
            variant="subtitle2"
            style={{
              marginTop: "auto",
              alignSelf: "center",
              color: "#2874F0",
            }}
            onClick={() => {
              setNewUser(false);
            }}
          >
            Existing User? Log In
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
