import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Path from "../Path/Path";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import axios from "axios";
import "./Robots.css";
import Loader from "../Loader/Loader";
import Empty from "../Empty/Empty";

interface Robot {
  id: number;
  name: string;
  IP: string;
  Task_id?: number;
  task_name?: string;
}

export default function Robots() {
  const {
    isChecked,
    userData,
    WEB_IP,
    isLoading,
    setIsLoading,
    setDashboardIP,
  } = useContext(Context);

  const [robots, setRobots] = useState<Robot[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://${WEB_IP}:8000/api/getRobots`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        setRobots(response.data);
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axios
      .get(`http://${WEB_IP}:8000/api/getTasks`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        setTasks(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const AddRobot = () => {
    Swal.fire({
      title: "Enter Robot Information",
      html: `
      <div class="row" style="display: flex; align-items: center;">
        <div class="col-3">
          <label for="robot-name">Robot Name:</label>
        </div>
        <div class="col-8">
          <input type="text" id="robot-name" placeholder="Robot Name" class="swal2-input" />
        </div>
      </div>
      <div class="row" style="display: flex; align-items: center;">
        <div class="col-3">
          <label for="robot-IP">Robot IP:</label>
        </div>
        <div class="col-8">
          <input type="text" id="robot-IP" placeholder="Robot IP" class="swal2-input" />
        </div>
      <div>
    `,
      customClass: {
        popup: "swal-robot-popup",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nameElement = document.getElementById(
          "robot-name"
        ) as HTMLInputElement;
        const IPElement = document.getElementById(
          "robot-IP"
        ) as HTMLSelectElement;

        const name = nameElement?.value;
        const IP = IPElement?.value;

        if (!name) {
          Swal.showValidationMessage("Please enter a robot name.");
          return;
        }

        if (!IP) {
          Swal.showValidationMessage("Please select a robot type.");
          return;
        }

        return axios
          .post(
            `http://${WEB_IP}:8000/api/createRobot`,
            { name, IP },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              throw new Error(response.statusText);
            }
            setRobots(response.data);
            console.log(response.data);
            return response.data;
          })
          .catch((error) => {
            if (error.response) {
              Swal.showValidationMessage(
                `Request failed: ${error.response.data}`
              );
            } else if (error.request) {
              Swal.showValidationMessage(`Request failed: ${error.request}`);
            } else {
              Swal.showValidationMessage(`Error: ${error.message}`);
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Your robot has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const DeleteRobot = (Robot_id: number) => {
    console.log(Robot_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://${WEB_IP}:8000/api/deleteRobot`, {
            params: { id: Robot_id },
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.statusText);
            }
            setRobots(res.data.remainingRobots);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Deletion error:", error);
          });
      }
    });
  };

  const editRobot = (Robot_id: number) => {
    const Robot = robots.find((robot) => robot.id === Robot_id);
    console.log(Robot);
    Swal.fire({
      title: "Edit Robot Information",
      html: `
      <div class="row" style="display: flex; align-items: center;">
        <div class="col-3">
          <label for="robot-name">Robot Name:</label>
        </div>
        <div class="col-8">
          <input type="text" id="robot-name" value=${
            Robot?.name
          } class="swal2-input" />
        </div>
      </div>
      <div class="row" style="display: flex; align-items: center;">
        <div class="col-3">
          <label for="robot-IP">Robot IP:</label>
        </div>
        <div class="col-8">
          <input type="text" id="robot-IP" value=${
            Robot?.IP
          } class="swal2-input" />
        </div>
      <div>
      <div class="row" style="display: flex; align-items: center;">
        <div class="col-3">
          <label for="robot-name">Task:</label>
        </div>
        <div class="col-8">
          <select id="task-select" class="swal2-input">
          <option value="" disabled selected>
                    Select Task
                  </option>
            ${tasks.map(
              (task) => `<option value="${task.id}">${task.name}</option>`
            )}
          </select>
        </div>
      </div>
    `,
      customClass: {
        popup: "swal-robot-popup",
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nameElement = document.getElementById(
          "robot-name"
        ) as HTMLInputElement;
        const IPElement = document.getElementById(
          "robot-IP"
        ) as HTMLSelectElement;
        const TaskElement = document.getElementById(
          "task-select"
        ) as HTMLSelectElement;

        const name = nameElement?.value;
        const IP = IPElement?.value;
        const Task_id = parseInt(TaskElement?.value);
        const task = tasks.find((task) => task.id === Task_id);
        const task_Name = task ? task.name : null;
        console.log(Task_id);

        if (!name) {
          Swal.showValidationMessage("Please enter a robot name.");
          return;
        }

        if (!IP) {
          Swal.showValidationMessage("Please select a robot type.");
          return;
        }

        if (!Task_id) {
          Swal.showValidationMessage("Please select a Task.");
          return;
        }

        return axios
          .put(
            `http://${WEB_IP}:8000/api/editRobot`,
            { Robot_id, name, IP, Task_id, task_Name },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              throw new Error(response.statusText);
            }
            setRobots(response.data.robots);
            console.log(response.data.robots);
            AssignTask(IP, task_Name);
            return response.data;
          })
          .catch((error) => {
            if (error.response) {
              Swal.showValidationMessage(
                `Request failed: ${error.response.data}`
              );
            } else if (error.request) {
              Swal.showValidationMessage(`Request failed: ${error.request}`);
            } else {
              Swal.showValidationMessage(`Error: ${error.message}`);
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Your robot has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const AssignTask = (IP: string, taskName: string) => {
    axios
      .post(
        `http://${IP}:8001/api/assignTask`,
        { taskname: taskName },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.statusText);
        }
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      <Path title="Robots" />
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-5" onClick={AddRobot}>
          + Add Robot
        </button>
      </div>
      {robots.length === 0 ? (
        <Empty text="Robots" />
      ) : (
        <div className="robots-table px-5">
          <table
            className={`table table-hover ${
              isChecked ? "table-light" : "table-dark"
            }`}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Robot</th>
                <th scope="col">IP</th>
                <th scope="col">Task</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {robots.map((item, index) => (
                <tr key={`robot-${index}`}>
                  <th scope="row">{index}</th>
                  <td onClick={() => setDashboardIP(item.IP)}>
                    <Link to={`/robots/${item.id}/dashboard`}>{item.name}</Link>
                  </td>
                  <td>{item.IP}</td>
                  <td>{item.task_name ? item.task_name : "-"}</td>
                  <td>
                    <i
                      className="bx bx-edit fs-4 text-primary mx-2"
                      onClick={() => editRobot(item.id)}
                    ></i>
                    <i
                      className="bx bx-trash text-danger fs-4 mx-2"
                      onClick={() => DeleteRobot(item.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
