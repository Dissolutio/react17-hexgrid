import React from "react";
import { render, screen } from "@testing-library/react";

import { Hexagon } from "./Hexagon";
import { HexgridLayout } from "./HexgridLayout";

describe("<Hexagon />", () => {
  test("rendered svg element", () => {
    render(
      <HexgridLayout>
        <Hexagon hex={{ q: 0, r: 0, s: 0 }} />
      </HexgridLayout>
    );
    expect(screen.getByTestId("Hexagon")).toBeDefined();
  });
});
