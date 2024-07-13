import { FC } from "react";
import ControlPanel from "./Control_Panel/Control_Panel";
import LiveLocation from "./Live_Location/LiveLocation";
import Header from "./Header/Header";
import Navbar from "../Navbar/Navbar";

const Dashboard: FC = () => {
  return (
    <div className="main_content dashboard_part">
      <Navbar />

      <Header />
      <div className="mx-4">
        <div className="row">
          <div className=" col-12 order-sm-2 order-lg-1">
            <LiveLocation />
          </div>
          <div className="col-12 order-sm-1 order-lg-2">
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
