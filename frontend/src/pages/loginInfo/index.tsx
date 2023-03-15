import React from "react";

export default function index() {
  return (
    <div>
      <div>login 성공! 안녕하세요 {localStorage.getItem("name")}님</div>;
    </div>
  );
}
