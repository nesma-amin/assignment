import React from "react";
import { render, screen } from "../test-utils";
import  Dashboard  from "./components/Dashboard";

describe("Home Pages", () => {
  test("Should be render", () => {
    render(<Dashboard />);
    const getAText = screen.getByTestId("welcome");
    expect(getAText).toBeInTheDocument();
  });
});