import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgUrl, boxes }) => {
  return (
    <div className="center mt2 dib" style={{ position: "relative" }}>
      <img
        id="inputImage"
        src={imgUrl}
        alt=""
        width="500px"
        height="auto"
        data-testid="face-image"
      />
      {boxes &&
        boxes.map((box, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              top: box.topRow,
              left: box.leftCol,
              right: box.rightCol,
              bottom: box.bottomRow + 10,
            }}
          ></div>
        ))}
    </div>
  );
};

export default FaceRecognition;
