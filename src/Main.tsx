import { FunctionComponent, useReducer, useEffect, useState } from "react";
import type { LogsData } from "./Logs";
import icon from "../public/spell_fire_felfireward.webp";
import Logs from "./Logs";
import reducer, { SAVED_LOGS_KEY } from "./reducer";
import Clock from "./Clock";

let initialData: LogsData[] = [];

const Main: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, {
    logs: initialData,
    nextLog: new Date(),
  });

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
      <Clock state={state} />
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
