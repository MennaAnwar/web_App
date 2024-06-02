import { FC } from "react";
import Card from "../Card/Card";
import PositionControl from "./PositionControl";
import "./Control_Panel.css";
import VelocityControl from "./VelocityControl";
import PID from "./PID";
import KeyboardControl from "./KeyboardControl";
import ArmControl from "./ArmControl";

const ControlPanel: FC = () => {
  return (
    <Card
      Title="Control Panel:"
      Content={
        <>
          <PositionControl />
          <hr className="hr hr-blurry" />
          <VelocityControl />
          <hr className="hr hr-blurry" />
          <ArmControl />
          <hr className="hr hr-blurry" />
          <PID />
          <hr className="hr hr-blurry" />
          <KeyboardControl />
        </>
      }
    />
  );
};

export default ControlPanel;
