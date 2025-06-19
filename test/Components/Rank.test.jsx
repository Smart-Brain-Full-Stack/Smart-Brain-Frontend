import { render, screen } from "@testing-library/react";
import Rank from "../../src/Components/Rank/Rank";
import { describe, expect, vi } from "vitest";

const mockAxios = { put: vi.fn() };

const Req = async () => {
  try {
    const { data } = await mockAxios.put("/image", { id: 1 });
  } catch (error) {
    console.error(error);
  }
};
describe("testing", () => {
  test("testing Rank Comp", () => {
    const name = "Slade";
    const entries = 5;

    render(<Rank name={name} entries={entries} />);

    expect(
      screen.getByText("Slade,your current entry is ...")
    ).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
  });

  test("testing Req func", async () => {
    mockAxios.put.mockResolvedValue({ data: {} });
    expect.assertions(3);

    await Req();
    expect(mockAxios.put).toHaveBeenCalledWith("/image", { id: 1 });
    expect(mockAxios.put).toHaveBeenCalledTimes(1);

    await Req();
    expect(mockAxios.put).toHaveBeenCalledTimes(2);
  });

  test("logs error on API failure", async () => {
    expect.assertions(2);

    const error = new Error("error");
    mockAxios.put.mockRejectedValue(error);

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await Req();
    expect(mockAxios.put).toHaveBeenCalledWith("/image", { id: 1 });
    expect(errorSpy).toHaveBeenCalledWith(error);

    errorSpy.mockRestore(); // Clean up
  });
});
