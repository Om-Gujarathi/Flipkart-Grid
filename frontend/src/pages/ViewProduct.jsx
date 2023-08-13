import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import API_END_POINT from "../../utility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Rating from "@mui/material/Rating";
import CommentList from "../components/CommentList";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewProduct() {
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
        setProduct(res.data.product);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CourseCard product={product}></CourseCard>
    </div>
  );
}

function CourseCard(props) {
  const { productId } = useParams();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const product = props.product;
  return (
    <Card
      style={{
        marginTop: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            margin: 10,
            width: 500,
            minHeight: 500,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={product.imageLink} style={{ width: 500 }}></img>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "50px",
            }}
          >
            <Button
              size="large"
              variant="contained"
              width="100px"
              disableElevation
              style={{
                backgroundColor: "#FF9F00",
                width: "200px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ShoppingCartIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Add to Cart
                </Typography>
              </div>
            </Button>

            <Button
              size="large"
              variant="contained"
              disableElevation
              style={{
                backgroundColor: "#FB641B",
                width: "200px",
              }}
              onClick={async () => {
                const res = await axios.post(
                  `${API_END_POINT}/users/products/${productId}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                handleClick();
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FlashOnIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Buy Now
                </Typography>
              </div>
            </Button>
          </div>
        </div>
        <div
          style={{
            marginTop: "50px",
          }}
        >
          <div style={{}}>
            <Typography variant="h3">{product.title}</Typography>
            <Rating name="read-only" value={4} readOnly />
            <Typography variant="subtitle1" style={{ color: "gray" }}>
              Price
            </Typography>
            <Typography variant="h6">
              <b>₹ {product.price} </b>
            </Typography>
          </div>
          <Reviews isPurchased={product.isPurchased}></Reviews>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          "Product Purchased Successfully!"
        </Alert>
      </Snackbar>
    </Card>
  );
}

function Reviews({ isPurchased }) {
  console.log(isPurchased);
  return (
    <div
      style={{
        width: "500px",
        height: "300px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      {isPurchased ? (
        <TextField
          sx={{
            marginLeft: "70px",
          }}
        ></TextField>
      ) : (
        <div> </div>
      )}

      <CommentList></CommentList>
    </div>
  );
}

export default ViewProduct;
