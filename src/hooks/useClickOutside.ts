import { RefObject, useEffect } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (ref && !ref.current?.contains(event.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [ref, callback]);
}
