import { FunctionComponent, useReducer, useEffect, useState } from "react";
import type { LogsData } from "./Logs";
import icon from "../public/spell_fire_felfireward.webp";
import Logs from "./Logs";
import reducer, { SAVED_LOGS_KEY } from "./reducer";
import { timeDiff } from "./utils";

let initialData: LogsData[] = [];

const Main: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, {
    logs: initialData,
    nextLog: new Date(),
  });
  const [now, setNow] = useState(new Date());
  const [nextLog, setNextLog] = useState(
    new Date(timeDiff(state.nextLog, now))
  );

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const newNow = new Date();
      setNow(newNow);
      setNextLog(new Date(timeDiff(state.nextLog, newNow)));
    }, 1000);
    return () => clearTimeout(timeoutID);
  }, [now]);

  useEffect(() => {
    const lsLogsData = localStorage.getItem(SAVED_LOGS_KEY);
    if (lsLogsData === null) {
      return;
    }

    const localStorageLogs = JSON.parse(lsLogsData);

    dispatch({ type: "LOAD_LOGS", payload: localStorageLogs });
  }, []);

  return (
    <div className="m-5 bg-gray-100 p-5">
      <h1 className="text-gray-500 text-xl text-center">
        Bloodhunter's Quarry Ledger
      </h1>
      <h2 className="text-center text-purple-800 text-lg font-bold">
        {now > state.nextLog
          ? "Available"
          : `In ${nextLog.getMinutes()}:${nextLog.getSeconds()}`}
      </h2>
      <button
        onClick={() => {
          dispatch({ type: "ADD_LOG" });
        }}
        className="group mt-2 hover:bg-gray-50 border-2 border-purple-500 bg-purple-700 p-2 flex mx-auto w-fit items-center"
      >
        <img className=" select-none" draggable="false" src={icon} alt="" />
        <span className="group-hover:text-purple-700 text-white font-bold ml-2">
          I just looted [BloodHunter's Quarry]
        </span>
      </button>
      <Logs logsData={state.logs} />
    </div>
  );
};

export default Main;
