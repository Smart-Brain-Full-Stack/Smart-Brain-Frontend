import { fireEvent, render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ImageLinkForm from "../../src/Components/ImageLinkForm/ImageLinkForm";

test("calls onChangeInput when typing in the input", () => {
  const mockOnChange = vi.fn();

  render(<ImageLinkForm onChangeInput={mockOnChange} />);

  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "https://some.img/url.jpg" } });

  expect(mockOnChange).toHaveBeenCalled();
  expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
});
