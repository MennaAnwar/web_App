import { FC, useContext, useEffect, useState } from "react";
import SpeedTimeChart from "../Chart/Chart";
import Context from "../../../Context";
import { io } from "socket.io-client";

const MotorsSpeed: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);
  const [Lines, setLines] = useState<string[]>([]);

  const socket = io(`http://${DASHBOARD_IP}:5000`);

  useEffect(() => {
    console.log("socket");
    socket.on("file_changed_motors", (data: { data: string }) => {
      setLines((prevLogs) => [data.data, ...prevLogs]);
      console.log(data.data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("file_changed_logs");
    };
  }, []);

  const speeds =
    Lines.length > 0 ? Lines[0].split(", ").map(Number) : [0, 0, 0, 0];

  return <SpeedTimeChart speeds={speeds} />;
};

export default MotorsSpeed;
