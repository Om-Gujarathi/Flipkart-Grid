import { Card, Typography } from "@mui/material";
import React from "react";

function Review() {
  return (
    <div>
      <Name></Name>
    </div>
  );
}

function Name() {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: "30px 10px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          padding: "20px",
        }}
      >
        Ratings & Reviews
      </Typography>
    </Card>
  );
}
export default Review;
