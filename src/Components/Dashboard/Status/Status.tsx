import { FC, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Status.css";
import axios from "axios";
import Context from "../../../Context";
import { io } from "socket.io-client";

const Status: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);
  const [Lines, setLines] = useState<string[]>([]);

  const socket = io(`http://${DASHBOARD_IP}:5000`);

  useEffect(() => {
    console.log("socket");
    socket.on("file_changed_status", (data: { data: string }) => {
      setLines((prevLogs) => [data.data, ...prevLogs]);
      console.log(data.data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("file_changed_logs");
    };
  }, []);

  return (
    <Card
      Title="Status"
      Content={
        <div className="table-responsive status">
          <table className="table table-borderless mb-0 table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">θ</th>
              </tr>
            </thead>
            <tbody>
              {Lines.length > 0 ? (
                Lines.map((line, index) => {
                  if (line) {
                    const parts = line.split(", ");
                    if (parts.length === 3) {
                      const [x, y, theta] = parts;
                      return (
                        <tr key={index}>
                          <td>{x}</td>
                          <td>{y}</td>
                          <td>{theta}</td>
                        </tr>
                      );
                    }
                  }
                  return null;
                })
              ) : (
                <tr>
                  <td colSpan={3}>No Status Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default Status;
