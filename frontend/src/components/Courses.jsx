import { useState } from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Card, SpeedDial } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import API_END_POINT from "../../utility";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_END_POINT}/users/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
      });
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {courses.map((course) => {
          return <CourseCard course={course} key={course._id}></CourseCard>;
        })}
      </div>
      <SpeedDial
        onClick={() => {
          navigate("/features");
        }}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<HelpOutlineIcon />}
      ></SpeedDial>
    </div>
  );
}

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 300, margin: 5 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/viewproduct/${course._id}`);
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 250, maxWidth: 300 }}
          image={course.imageLink}
          title={course.title}
          alt="Course Image"
        />
        <CardContent>
          <Typography variant="h5" align="center">
            {course.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Courses;
