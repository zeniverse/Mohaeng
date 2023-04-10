import { useEffect, useState, RefObject } from "react";

const useDetectClose = (
  elem: RefObject<HTMLDivElement>,
  initialState: boolean
) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current !== null && !elem.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);
  return [isOpen, setIsOpen] as const;
};

export default useDetectClose;
