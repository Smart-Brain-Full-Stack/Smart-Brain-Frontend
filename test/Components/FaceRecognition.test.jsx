import { render, screen } from "@testing-library/react";
import FaceRecognition from "../../src/Components/FaceRecognition/FaceRecognition";
import { expect } from "vitest";

test("testing img", () => {
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3HFVnkYFJ_OIogo__Qv58bmhwRqZJcQhOA&s";
  render(<FaceRecognition imgUrl={imgUrl} />);

  expect(screen.getByTestId("face-image")).toBeInTheDocument();
});
