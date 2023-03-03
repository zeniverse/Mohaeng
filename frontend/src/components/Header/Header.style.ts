import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const HeaderStyled = styled.header`
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav {
      display: flex;
      align-items: center;
    }
    .search-bar {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 25px;
      padding: 5px 10px;
      margin-right: 20px;
      width: 300px;
      max-width: 100%;
      input {
        border: none;
        background-color: transparent;
        width: 100%;
        margin-right: 10px;
        &:focus {
          outline: none;
        }
      }
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
    .menu {
      display: flex;
      a {
        color: #333;
        margin-right: 20px;
        text-decoration: none;
        font-weight: bold;
        &:hover {
          color: #004aad;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .btn {
    button {
      border: none;
      border-radius: 50px;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: bold;
      & + button {
        margin-left: 10px;
      }
      &.login-btn {
        background-color: #ffffff;
        color: #333;
        &:hover {
          background-color: #f5f5f5;
        }
      }
      &.signup-btn {
        background-color: #004aad;
        color: #ffffff;
        &:hover {
          background-color: #002956;
        }
      }
    }
  }
`;

export const StyledIcon = styled(BsSearch)`
  color: #004aad;
`;
