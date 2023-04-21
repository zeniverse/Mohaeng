import { useState } from "react";
const useInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState("");
};

export default useInput;
