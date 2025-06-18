import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import "tachyons";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./Components/Rank/Rank";
import { useState, useEffect } from "react";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/Sign in/SiginIn";
import RegisterNav from "./Components/Sign in/RegisterNav";
import Register from "./Components/Register/Register";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { axiosinstance } from "../axiosinstance";

function App() {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [boxes, setBoxes] = useState([]);

  //currUser
  //will delete password later
  const [currUser, setCurrUser] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://stark-ravine-11103-56024eaa1c1d.herokuapp.com"
  //       );
  //       const data = res;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const Req = async () => {
    try {
      const { data } = await axiosinstance.put("/image", { id: currUser.id });

      if (!data.entries) {
        throw new Error(`HTTP error! Status`);
      }

      const { entries } = data;

      setCurrUser((u) => ({ ...u, entries }));
    } catch (error) {
      console.error(error);
    }
  };

  //For on Change event
  const onChangeInput = function (e) {
    setInput(e.target.value);
  };

  const onSubmit = async () => {
    if (currUser) {
      setImgUrl(input);

      try {
        const { data } = await axiosinstance.post("/detect-face", {
          imageUrl: input,
        });

        if (data.status.description !== "Ok") {
          throw new Error(`HTTP error!`);
        }

        const regions = data.outputs[0].data.regions;
        if (regions) {
          Req();
        }
        //assign
        let topRow, leftCol, bottomRow, rightCol;
        let tempBox = [];

        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height);

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          topRow = boundingBox.top_row * height;
          leftCol = boundingBox.left_col * width;
          bottomRow = height - boundingBox.bottom_row * height;
          rightCol = width - boundingBox.right_col * width;

          //box object
          const box = {
            topRow: topRow,
            leftCol: leftCol,
            bottomRow: bottomRow,
            rightCol: rightCol,
          };
          tempBox.push(box);
        });
        setBoxes(tempBox);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute user={currUser}>
            <>
              <RegisterNav />
              <SignIn setCurrUser={setCurrUser} />
            </>
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute user={currUser}>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/mainpage"
        //main page
        element={
          <ProtectedRoute user={currUser}>
            <>
              <div className="App">
                <Navigation setCurrUser={setCurrUser} setImgUrl={setImgUrl} />
                <Logo />
                {currUser && (
                  <Rank name={currUser.name} entries={currUser.entries} />
                )}
                <ImageLinkForm
                  onChangeInput={onChangeInput}
                  onSubmit={onSubmit}
                />
                <FaceRecognition imgUrl={imgUrl} boxes={boxes} />
              </div>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
