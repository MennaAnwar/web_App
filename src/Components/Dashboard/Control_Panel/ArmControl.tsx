import React, { FC, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Context from "../../../Context";

const ArmControl: FC = () => {
  const attributes = ["Angle", "Gripper"];
  const { DASHBOARD_IP } = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const [params, setParams] = useState<any>({
    Angle: 0,
    Gripper: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const ARM_Control = () => {
    axios
      .post(`http://${DASHBOARD_IP}:8001/api/ARM_test`, {
        Angle: params.Angle,
        Gripper: params.Gripper,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-wrapper">
      <h6>ARM Control:</h6>

      <form
        className="d-flex justify-content-between"
        onSubmit={handleSubmit(ARM_Control)}
      >
        {attributes.map((attribute, index) => (
          <div className="input-group" key={index}>
            <input
              type="number"
              id={attribute}
              placeholder=""
              {...register(attribute, { onChange: handleChange })}
            />
            <label htmlFor={attribute}>{attribute}</label>
          </div>
        ))}
        <button className="go-btn" type="submit">
          Go
        </button>
      </form>
    </div>
  );
};

export default ArmControl;
