import styled from "styled-components";

type ButtonBoxPropsType = {
  width?: undefined | string;
  height?: undefined | string;
  bar?: null | boolean;
};

export const ButtonBox = styled.div<ButtonBoxPropsType>`
  display: inline-block;
  border-radius: 20px;
  border: ${(props) => (props.bar ? "2px solid #000" : "none")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  button {
    cursor: pointer;
    border: none;
    border-radius: 20px;
    background-color: #000;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`;
