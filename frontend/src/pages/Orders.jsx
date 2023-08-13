import React, { useEffect, useState } from "react";
import axios from "axios";
import API_END_POINT from "../../utility";
import { Card, Avatar, Typography } from "@mui/material";

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

  return products.map((product) => {
    return <Product product={product} key={product._id}></Product>;
  });
}

function Product({ product }) {
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
      </div>
    </Card>
  );
}
