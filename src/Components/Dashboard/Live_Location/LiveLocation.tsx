import { FC, useContext } from "react";
import Card from "../Card/Card";
import "./LiveLocation.css";
import Context from "../../../Context";

const LiveLocation: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);

  return (
    <Card
      Title="Live Location"
      Content={
        <div className="d-flex align-items-center">
          <h4>You Can view Live stream here</h4>
          <a
            href={`http://${DASHBOARD_IP}:8080/stream.html`}
            target="_blank"
            className="link"
          >
            <i className="bx bx-right-arrow-alt mx-2"></i>
          </a>
        </div>
      }
    />
  );
};

export default LiveLocation;
