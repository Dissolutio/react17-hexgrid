import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
  HexgridLayout,
  HexgridLayoutCtxValue,
  HexgridLayoutContext,
  HexgridLayoutProviderProps,
  HexgridLayoutProvider,
  useHexgridLayoutContext,
} from "./HexgridLayout";

test("renders svg element", () => {
  render(<HexgridLayout />);
  expect(screen.getByTestId("HexgridLayout")).toBeDefined();
});

// customRender(<MyConsumer />, providerProps)

//* CUSTOM RENDER EXAMPLE
// const customRender = (
//   ui: React.ReactChild,
//   providerProps: HexgridLayoutProviderProps
// ) => {
//   return render(
//     <HexgridLayoutProvider {...providerProps}>{ui}</HexgridLayoutProvider>
//   );
// };
test("Consumer component shows value from provider", () => {
  const MyConsumer = () => {
    const { layout, points } = useHexgridLayoutContext();
    return <div data-testid="MyConsumer">{points}</div>;
  };
  const providerProps = {
    flat: true,
    origin: { x: 0, y: 0 },
    size: { x: 10, y: 10 },
    spacing: 1.0,
  };
  render(
    <HexgridLayoutProvider {...providerProps}>
      <MyConsumer />
    </HexgridLayoutProvider>
  );
  expect(screen.getByTestId("MyConsumer")).toHaveTextContent(
    "10,0 5.000000000000001,8.660254037844386 -4.999999999999998,8.660254037844387 -10,1.2246467991473533e-15 -5.000000000000004,-8.660254037844386 5.000000000000001,-8.660254037844386"
  );
});

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
// test("NameProvider composes full name from first, last", () => {
//   const providerProps = {
//     first: "Boba",
//     last: "Fett",
//   };
//   customRender(
//     <NameContext.Consumer>
//       {(value) => <span>Received: {value}</span>}
//     </NameContext.Consumer>,
//     { providerProps }
//   );
//   expect(screen.getByText(/^Received:/).textContent).toBe(
//     "Received: Boba Fett"
//   );
// });

/**
 * A tree containing both a providers and consumer can be rendered normally
 */
// test("NameProvider/Consumer shows name of character", () => {
//   const wrapper = ({ children }) => (
//     <NameProvider first="Leia" last="Organa">
//       {children}
//     </NameProvider>
//   );

//   render(<NameConsumer />, { wrapper });
//   expect(screen.getByText(/^My Name Is:/).textContent).toBe(
//     "My Name Is: Leia Organa"
//   );
// });
