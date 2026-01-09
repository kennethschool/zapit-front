import { useEffect } from "react";

type KeyboardNavigationCallbacks = {
  onNext: () => void;
  onPrevious: () => void;
};

export default function useKeyboardNavigation({ onNext, onPrevious }: KeyboardNavigationCallbacks) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // NEXT / SKIP keys
      if (key === "arrowright" || key === " " || key === "enter" || key === "n") {
        e.preventDefault(); // prevent scrolling for space
        onNext();
      }

      // PREVIOUS keys
      if (key === "arrowleft" || key === "backspace" || key === "p") {
        e.preventDefault(); // prevent browser back for backspace
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious]);
}
