import React, { ReactNode } from "react";

export type TextProps = {
  children?: ReactNode;
  className?: string;
  x?: string | number;
  y?: string | number;
};
export const Text = (props: TextProps) => {
  const { children, className, x, y } = props;
  return (
    <text
      x={x || 0}
      y={y ? y : "0.3em"}
      className={className}
      textAnchor="middle"
    >
      {children}
    </text>
  );
};
