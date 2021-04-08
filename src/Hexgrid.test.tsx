import React from "react";
import { render, screen } from "@testing-library/react";

import { Hexgrid } from "./Hexgrid";

describe("<Hexgrid />", () => {
  test("rendered svg element", () => {
    render(<Hexgrid />);
    expect(screen.getByTestId("Hexgrid")).toBeDefined();
  });
});
