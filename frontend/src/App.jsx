import Appbar from "./components/Appbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./components/Courses";
import AddCourse from "./components/AddCourse";
import { RecoilRoot } from "recoil";
import EditCourse from "./components/EditCourse";
import ViewProduct from "./pages/ViewProduct";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#eeeeee",
      }}
    >
      <RecoilRoot>
        <BrowserRouter>
          <Appbar></Appbar>
          <Routes>
            <Route path="/" element={<Courses />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/addcourse" element={<AddCourse />}></Route>
            <Route path="/viewproduct/:productId" element={<ViewProduct/>}></Route>
            <Route path="/courses/:courseId" element={<EditCourse />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
