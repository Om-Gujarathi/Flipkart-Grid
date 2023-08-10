import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import API_END_POINT from "../../utility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

const comment = [
  {
    title: "NICE",
    description: "HELLO",
    username: "Om Gujarathi",
    date: "24 July 2023",
    id: 1,
    rating: 2,
  },
  {
    title: "Excellent",
    description: "Very nice quality",
    username: "Om Gujarathi",
    date: "24 July 2023",
    id: 2,
    rating: 3,
  },
];
function ViewProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/admin/courses/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data.course);
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
  const product = props.product;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
      }}
    >
      <Card
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
      </Card>
      <div>
        <div style={{}}>
          <Typography variant="h3">{product.title}</Typography>
          <Rating name="read-only" value={5} readOnly />
          <Typography variant="subtitle1" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {product.price} </b>
          </Typography>
        </div>
        <Reviews></Reviews>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <Card
      variant="outlined"
      style={{
        width: "500px",
        height: "300px",
        border: "1px solid black",
        marginTop: "50px",
        backgroundColor: "transparent",
        marginBottom: "50px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Box>
      {comment.map((com) => {
        return <Comment comment={com} key={com.id}></Comment>;
      })}
    </Card>
  );
}

function Comment(props) {
  const comment = props.comment;
  return (
    <div
      style={{
        marginLeft: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "20px",
            backgroundColor: "#FF6161",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
            borderRadius: "5px",
            paddingBottom: "1px",
            paddingTop: "1px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "600",
            }}
          >
            {comment.rating}
          </Typography>
          <StarIcon sx={{ fontSize: 12, color: "white" }}></StarIcon>
        </div>
        <Typography
          sx={{
            fontWeight: "600",
            marginLeft: "8px",
            fontSize: "14",
          }}
        >
          {comment.title}
        </Typography>
      </div>

      <Typography>{comment.description}</Typography>
      <div
        style={{
          display: "flex",
        }}
      >
        <Typography variant="subtitle2">{comment.username}</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            marginLeft: "5px",
          }}
        >
          {comment.date}
        </Typography>
      </div>

      <Divider></Divider>
    </div>
  );
}

export default ViewProduct;