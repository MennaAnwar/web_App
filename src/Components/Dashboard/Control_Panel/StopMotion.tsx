import { useContext } from "react";
import Context from "../../../Context";
import axios from "axios";

export default function Stop() {
  const { DASHBOARD_IP } = useContext(Context);

  const vel_Control = () => {
    axios
      .post(`http://${DASHBOARD_IP}:8001/api/velocity_test`, {
        x: 0,
        y: 0,
        theta: 0,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button onClick={vel_Control} className="btn btn-danger">
      Stop
    </button>
  );
}
