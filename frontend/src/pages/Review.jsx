import {
  Card,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import * as React from "react";
import Rating from "@mui/material/Rating";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import API_END_POINT from "../../utility";
import { useParams } from "react-router-dom";

function Review() {
  return (
    <div>
      <Name></Name>
    </div>
  );
}

function Name() {
  const { productId } = useParams();
  const [rating, setRating] = React.useState(0);
  const [description, setDescription] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [name, setName] = React.useState(null);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: "60px",
          padding: "5px 10px",
          margin: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 500,
          }}
        >
          Ratings & Reviews
        </Typography>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            width: "71%",
            margin: "10px",
            height: "fit-content",
          }}
        >
          <div
            style={{
              margin: "20px",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}
            >
              Rate
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
            />
            <Divider></Divider>
          </div>
          <div
            style={{
              margin: "20px",
              boxShadow: "none",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: 500, marginBottom: "5px" }}
            >
              Review
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <TextField
                id="filled-multiline-static"
                label="Description"
                InputProps={{ sx: { borderRadius: 0 } }}
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                sx={{
                  background: "white",
                  width: "100%",
                  margin: "5px",
                }}
              />
              <TextField
                id="filled-multiline-static"
                label="Title"
                InputProps={{ sx: { borderRadius: 0 } }}
                variant="outlined"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                sx={{
                  background: "white",
                  width: "100%",
                  margin: "5px",
                }}
              />
              <TextField
                id="filled-multiline-static"
                label="Name"
                InputProps={{ sx: { borderRadius: 0 } }}
                variant="outlined"
                sx={{
                  background: "white",
                  width: "100%",
                  margin: "5px",
                }}
              />
              <br />
              <br />
              <IconButton>
                <AddAPhotoIcon
                  sx={{
                    margin: "5px",
                    color: "grey",
                    backgroundColor: "#eeeeee",
                    padding: "16px",
                  }}
                ></AddAPhotoIcon>
              </IconButton>
              <div></div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FB641B",
                  borderRadius: "2px",
                  alignSelf: "flex-end",
                  margin: "0 22px 20px 0",
                  padding: "10px 20px",
                  width: "250px",
                  height: "55px",
                  fontSize: "16px",
                }}
                onClick={async () => {
                  console.log(description, title, rating);
                  await axios.post(
                    `${API_END_POINT}/users/addComment/${productId}`,
                    {
                      body: title,
                      description: description,
                      rating: rating,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
export default Review;
