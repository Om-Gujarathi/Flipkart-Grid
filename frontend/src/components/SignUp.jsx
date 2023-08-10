import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_END_POINT from "../../utility";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <center>
      <div>
        <div
          style={{
            marginTop: 100,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Lets get you Signed up
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
                fetch(`${API_END_POINT}/admin/signup`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: email,
                    password: password,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    navigate("/login");
                  });
              }}
            >
              Sign up
            </Button>
          </div>
        </Card>
      </div>
    </center>
  );
}

export default SignUp;
