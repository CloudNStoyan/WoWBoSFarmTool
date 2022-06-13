import type { LogsData } from "./Logs";
type ReducerState = {
  logs: LogsData[];
  nextLog: Date;
};

type LocalStorageReducerState = {
  logs: LogsData[];
  nextLog: string;
};

type ReducerActionWithPayload = {
  type: "LOAD_LOGS";
  payload: LocalStorageReducerState;
};

type ReducerAction =
  | {
      type: "ADD_LOG";
    }
  | ReducerActionWithPayload;

export const SAVED_LOGS_KEY = "__WOW_BOS_FARM_LOGS_KEY__";

export default function reducer(state: ReducerState, action: ReducerAction) {
  if (action.type === "ADD_LOG") {
    state = {
      logs: [
        {
          lootedOn: new Date()
            .toLocaleString()
            .split(",")
            .reverse()
            .map((x) => x.trim())
            .join(", "),
        },
        ...state.logs.slice(0, 9),
      ],
      nextLog: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
    };

    localStorage.setItem(SAVED_LOGS_KEY, JSON.stringify(state));
  }

  if (action.type === "LOAD_LOGS") {
    state = {
      logs: action.payload.logs,
      nextLog: new Date(action.payload.nextLog),
    };
  }

  return state;
}
