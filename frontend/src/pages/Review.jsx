import { Card, Typography, Button } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function Review() {
  return (
    <div>
      <Name></Name>
    </div>
  );
}

function Name() {

  const [value, setValue] = React.useState(0);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          margin: "20px 5px",
          boxShadow: "0.2px 1px 10px grey",
          height: "fit-content"
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            width: "25%",
            margin: "10px",
            boxShadow: "0.2px 1px 10px grey",
            height: "fit-content"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              padding: "20px",
              borderBottom: "0.5px solid grey",
              margin: "5px",

            }}
          >

            What makes a good review
          </Typography>
          <Typography
            variant="h6"
            sx={{
              borderBottom: "0.2px solid grey"
            }}
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            Have you used this product?
            <p style={{ fontSize: "15px", width: "95%" }}>Your Review should be about your experience with the product</p>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              borderBottom: "0.2px solid grey"
            }}
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            Why review a product?
            <p style={{ fontSize: "15px", width: "95%" }}>Your valuable feedback will help fellow shoppers decie!</p>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              borderBottom: "0.2px solid grey"
            }}
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            How to review a product?
            <p style={{ fontSize: "15px", width: "95%" }}>Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the<a href="#" style={{
              textDecoration: "none"
            }}> help centre</a></p>
          </Typography>
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: "71%",
            margin: "10px",
            boxShadow: "0.2px 1px 10px grey",
            height: "fit-content"
          }}
        >
          <Card
            style={{
              margin: "15px",
              boxShadow: "none",
              borderBottom: "1px solid grey",
              padding : "20px 125px"
              
            }}
          >
            <Box
              sx={{
                '& > legend': { mt: 1 },
                margin: "0 15px",
                display : "flex",
                alignItems : "center",
                justifyContent : "space-between"

              }}
            >
              <Typography variant="h5" component="legend">Rate this Product</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);

                }}
              />
            </Box>
          </Card>
          <Card style={{
            margin: "15px",
            boxShadow: "none",
            borderRadius : "5px"
          }}>
            <Typography variant="h6" component="legend">Review this Product</Typography>
            <div
              style={{
                overflow: "hidden", margin: "15px 5px"
              }}>
              <div id="desc" style={{
                border: "0.2px solid grey", padding: "10px 10px",
                borderRadius : "5px", margin :"3px 0"
              }}>
                <Typography variant="h5" component="legend" style={{
                  fontSize: "20px"
                }}>Description</Typography>
                <textarea id="comments" placeholder="Description..." style={{
                  border: "none",
                  width: "98%",
                  height: "150px",
                  outline: "none",
                  fontSize: "15px",
                  margin: "10px 0"
                }}
                />
              </div>
              <div id="title" style={{
                border: "0.2px solid grey", padding: "10px 10px",
                borderRadius : "5px", margin :"3px 0"
              }}>
                <Typography variant="h5" component="legend" style={{
                  fontSize: "20px"
                }}>Title (Optional)</Typography>
                <input type="text" placeholder="Review Title" style={{
                  border: "none",
                  width: "98%",
                  height: "25px",
                  outline: "none",
                  fontSize: "15px",
                  margin: "10px 0"
                }} />
              </div>
              <div id="cus_name" style={{
                border: "0.2px solid grey", padding: "10px 10px",
                borderRadius : "5px", margin :"3px 0"
              }}>
                <Typography variant="h5" component="legend" style={{
                  fontSize: "20px"
                }}>Name</Typography>
                <input type="text" placeholder="ShopKart Customer" style={{
                  border: "none",
                  width: "98%",
                  height: "25px",
                  outline: "none",
                  fontSize: "15px",
                  margin: "10px 0"
                }} />
              </div>
              <div id="image" style={{
                border: "0.2px solid grey", padding: "10px 10px",
                borderRadius : "5px", margin :"3px 0"
              }}>
                <Button
                size="large"
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#FB641B",
                  width: "20px",
                }}
                >
                  <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AddAPhotoIcon/>
                </div>
                </Button>
                <Button
                size="large"
                variant="contained"
                disableElevation
                style={{
                  backgroundColor: "#FB641B",
                  width: "200px",
                  float:"right",
                  marginRight:"50px"
                }}
                
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Submit
                  </Typography>
                </div>
              </Button>
              </div>
             
            </div>
          </Card>
        </Card>
      </div>
    </>
  );
}
export default Review;
