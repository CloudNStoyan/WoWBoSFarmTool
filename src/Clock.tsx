import { timeDiff } from "./utils";
import React, { FunctionComponent, useState, useEffect } from "react";
import type { ReducerState } from "./reducer";

const Clock: FunctionComponent<{
  state: ReducerState;
}> = ({ state }) => {
  const [now, setNow] = useState(new Date());
  const [nextLog, setNextLog] = useState(0);

  const convertTimeDiffToString = (time: number) => {
    const getIntegralFromNumber = (numb: number) =>
      numb.toString().split(".")[0].padStart(2, "0");

    time = time / 1000;

    return `${getIntegralFromNumber(time / 60)}:${getIntegralFromNumber(
      time % 60
    )}`;
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const newNow = new Date();
      setNow(newNow);
      setNextLog(timeDiff(state.nextLog, newNow));
    }, 1000);
    return () => clearTimeout(timeoutID);
  }, [now]);

  return (
    <h2 className="text-center text-purple-800 text-lg font-bold">
      {nextLog < 0 ? "Available" : `In ${convertTimeDiffToString(nextLog)}`}
    </h2>
  );
};

export default Clock;
