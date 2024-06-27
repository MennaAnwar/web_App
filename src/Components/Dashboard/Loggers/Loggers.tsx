import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Card from "../Card/Card";
import "./Loggers.css";
import Context from "../../../Context";

const Loggers = () => {
  const { DASHBOARD_IP } = useContext(Context);

  const [logs, setLogs] = useState<string[]>([]);
  const socket = io(`http://${DASHBOARD_IP}:5000`);

  useEffect(() => {
    console.log("socket");
    socket.on("file_changed_logs", (data) => {
      setLogs((prevLogs) => [data.data, ...prevLogs]);
      console.log(data.data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("file_changed_logs");
    };
  }, []);

  return (
    <div id="Logs">
      <Card
        Title="Logs"
        Content={
          <div className="logsContent">
            {logs.length > 0 ? (
              logs.map((line, index) => <h5 key={index}>{line}</h5>)
            ) : (
              <h5>No logs available</h5>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Loggers;
