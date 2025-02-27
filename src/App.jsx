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

function App() {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [boxes, setBoxes] = useState([]);

  //currUser
  //will delete password later
  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Req = async () => {
    try {
      const res = await fetch("http://localhost:3000/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currUser.id }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const { entries } = await res.json();
      setCurrUser((u) => ({ ...u, entries }));
    } catch (error) {
      console.error(error);
    }
  };

  //For on Change event
  const onChangeInput = function (e) {
    setInput(e.target.value);
  };

  const onSubmit = function () {
    if (currUser) {
      setImgUrl(input);

      fetch("http://localhost:3000/detect-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: input,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          //Updating entries
          Req();
          return response.json();
        })
        .then((result) => {
          const regions = result.outputs[0].data.regions;

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
        })
        .catch((error) => console.log("Error:", error));
    } else {
      alert("You need to login first!!!");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <RegisterNav />
            <SignIn setCurrUser={setCurrUser} />
          </>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/mainpage"
        //main page
        element={
          <>
            <div className="App">
              <Navigation setCurrUser={setCurrUser} />
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
        }
      />
    </Routes>
  );
}

export default App;
