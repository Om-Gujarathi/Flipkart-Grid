import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_END_POINT from "../../utility";
import StarIcon from "@mui/icons-material/Star";
import Chip from "@mui/material/Chip";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function CommentList() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/users/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  if (!product) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading....
      </div>
    );
  }

  return (
    <List
      style={{
        maxHeight: "100%",
        overflow: "auto",
        marginRight: "10px",
      }}
    >
      {product.reviews.map((comment) => {
        return (
          <ListItem key={comment._id}>
            <ListItemIcon>
              {
                <Chip
                  color="success"
                  size="small"
                  icon={<StarIcon sx={{ fontSize: 8 }} />}
                  label={comment.rating}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", fontWeight: 500 }}
                    variant="subtitle1"
                  >
                    {comment.body}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.description}
                  </Typography>
                  <br />
                   - <strong>{comment.by}</strong>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default CommentList;
