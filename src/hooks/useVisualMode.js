import { useState } from "react";

/*uses state and a history of the visual modes transitioned so that it can move forward or backward in showing various stages of interview process 
ie: 
SHOW -> DELETE -> CONFIRM -> DELETING -> ERROR_DELETE -> SHOW
*/

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = function () {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}
