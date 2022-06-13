import { FunctionComponent, useEffect, useState } from "react";
import { timeAgo, timeDiff } from "./utils";

export type LogsData = {
  lootedOn: string;
};

const Logs: FunctionComponent<{ logsData: LogsData[] }> = ({ logsData }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timeoutID = setTimeout(() => setNow(new Date()), 1000);
    return () => clearTimeout(timeoutID);
  }, [now]);

  return (
    <ul className="w-fit mx-auto mt-2 bg-white p-2">
      {logsData.map((log, i) => (
        <li className="my-1 text-center" key={i}>
          {timeAgo(timeDiff(now, new Date(log.lootedOn)))}
        </li>
      ))}
    </ul>
  );
};

export default Logs;
