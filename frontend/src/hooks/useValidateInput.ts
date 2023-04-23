import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { useState } from "react";
import { ICourseForm } from "../interfaces/Course.type";
import { setFormValue } from "../store/reducers/CourseFormSlice";

const useValidateInput = (
  validation: (value: string) => boolean,
  fieldValue: string
) => {
  const dispatch = useAppDispatch();
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validation(fieldValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    dispatch(
      setFormValue({ name: name as keyof ICourseForm, value: newValue })
    );
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: fieldValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};
export default useValidateInput;
