"use client";

import React from "react";
import { ButtonBox } from "./ButtonStyle";

type ButtonPropsType = {
  text: string;
  type?: string;
  width?: undefined | string;
  height?: undefined | string;
  bar?: null | boolean;
  onClick?: () => void;
};
export default function Button({
  text,
  type = "button",
  width,
  height,
  bar = false,
  onClick,
}: ButtonPropsType): JSX.Element {
  return (
    <ButtonBox width={width} height={height} bar={bar}>
      {type === "button" && <button type="button">{text}</button>}
      {type === "close" && (
        <button type="button" onClick={onClick}>
          {text}
        </button>
      )}
      {type === "submit" && <button type="submit">{text}</button>}
    </ButtonBox>
  );
}
