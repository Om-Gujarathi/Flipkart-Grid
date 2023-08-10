import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import API_END_POINT from "../../utility";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: 500,
          marginTop: 100,
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
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <TextField
            label="Description"
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <TextField
            label="ImageLink"
            variant="outlined"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <br />
          <TextField
            label="Price"
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <Button
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                `${API_END_POINT}/admin/courses`,
                {
                  title,
                  description,
                  image,
                  price,
                  published: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            }}
          >
            Add course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AddCourse;
