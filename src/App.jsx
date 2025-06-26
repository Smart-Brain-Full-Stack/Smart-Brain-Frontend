import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import "tachyons";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import { useState, useEffect } from "react";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import { Routes, Route, data, useLocation } from "react-router-dom";
import SignIn from "./Components/Sign in/SiginIn";
import RegisterNav from "./Components/Sign in/RegisterNav";
import Register from "./Components/Register/Register";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { axiosinstance } from "../axiosinstance";
import Modal from "./Components/Modal/Modal";
import axios from "axios";

function App() {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [boxes, setBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState();

  const location = useLocation();

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

      if (!data.data.entries) {
        throw new Error(`HTTP error! Status`);
      }

      const { entries } = data.data;

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
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      if (location.pathname === "/") return;

      try {
        setLoading(true);
        const { data } = await axiosinstance.get("/profile/me");

        setCurrUser(data.data.user);
      } catch (error) {
        const message = error?.response?.data?.message;
        if (message === "Unauthorized") {
          // It's expected on sign-in page, so chill
          console.error("Unexpected error:", message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    if (!currUser?.entries) return;

    const fetchEmoji = async () => {
      const { data } = await axios.get(
        `https://j9og0kc1pd.execute-api.ap-southeast-1.amazonaws.com/dev/rank?rank=${currUser.entries}`
      );

      const emoji = data.input;

      setCurrUser((u) => ({ ...u, emoji }));
    };

    fetchEmoji();
  }, [currUser?.entries]);

  if (loading)
    return (
      <div className="vh-100 flex items-center justify-center">
        <div className="f3">Loading...</div>
      </div>
    );

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
                <Modal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                />
                <Navigation
                  setCurrUser={setCurrUser}
                  setImgUrl={setImgUrl}
                  setShowModal={setShowModal}
                />

                {currUser && <Rank currUser={currUser} />}
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
