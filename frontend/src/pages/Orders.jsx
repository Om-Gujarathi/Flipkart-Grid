import React, { useEffect, useState } from "react";
import axios from "axios";
import API_END_POINT from "../../utility";
import { Card, Avatar, Typography, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/users/purchasedCourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.purchasedCourses) {
          setProducts(res.data.purchasedCourses);
        }
      })
      .catch((err) => {
        setUsername("");
      });
  }, []);

  return (
    <div>
      {products.map((product) => {
        return <Product product={product} key={product._id}></Product>;
      })}
      <center>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "white",
            color: "#2874f0",
            height: "40px",
            fontWeight: "700",
          }}
          disableElevation
          size="small"
          disabled
        >
          No more results to display
        </Button>
      </center>
    </div>
  );
}

function Product({ product }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        margin: "50px 200px",
        height: 150,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar
          variant="square"
          alt="Remy Sharp"
          src={product.imageLink}
          style={{
            width: 150,
            marginLeft: "20px",
            height: "130px",
            objectFit: "contain",
          }}
        ></Avatar>

        <Typography sx={{}} variant="subtitle2">
          {product.title}
        </Typography>

        <Typography sx={{}} variant="subtitle2">
          ₹{product.price}
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon sx={{ fontSize: 15, color: "#2874F0" }} />
          <Typography
            variant="subtitle2"
            style={{
              color: "#2874F0",
              marginLeft: "5px",
            }}
            onClick={() => {
              navigate(`/review/${product._id}`);
            }}
          >
            Rate & Review Product
          </Typography>
        </div>
      </div>
    </Card>
  );
}
