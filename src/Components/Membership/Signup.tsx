import axios from "axios";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface Props {
  handleClick: () => void;
}

const Signup: FC<Props> = ({ handleClick }) => {
  const { WEB_IP, logged_in, setLoggedIn, userData, setUserData } =
    useContext(Context);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = (field: string) => {
    switch (field) {
      case "NewPassword":
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case "ConfirmNewPassword":
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
        break;
      default:
        break;
    }
  };

  const signup = async () => {
    try {
      const res = await axios.post(`http://${WEB_IP}:8000/api/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (res.status === 200 || res.status === 201) {
        setUserData(res.data.user); // Assuming your API responds with the user data
        setLoggedIn(true);
        navigate(`/`);
      } else {
        throw new Error("Failed to register. Please try again later.");
      }
    } catch (error: unknown) {
      // First check if this is an AxiosError
      if (axios.isAxiosError(error)) {
        // Error is from Axios and we can access response and data
        if (error.response) {
          // Check for a 422 status code
          if (error.response.status === 422) {
            // Handle validation errors
            const validationErrors = error.response.data.errors; // Adjust depending on the error format
            const message = Object.keys(validationErrors)
              .map((key) => `${key}: ${validationErrors[key].join(", ")}`)
              .join("\n");
            Swal.fire({
              icon: "error",
              title: "Validation Error",
              text: message,
            });
          } else {
            // General error handling for other status codes
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text:
                error.response.data.message ||
                "An unexpected error occurred during registration.",
            });
          }
        } else {
          // Error does not have a response (could be network error or something else)
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "No response from server. Check your network connection.",
          });
        }
      } else {
        // Error is not an AxiosError, could be something else like a programming error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="form-wrapper sign-up">
      <form onSubmit={handleSubmit(signup)}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="text"
            id="name"
            placeholder=" "
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z]+$/,
              onChange: onChangeValue,
            })}
          />
          <label htmlFor="name">Username</label>
        </div>
        {errors.name && (
          <p className="error-msg ">
            {errors.name.type === "pattern"
              ? "No numbers or special characters allowed"
              : "This field is required"}
          </p>
        )}
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            {...register("email", { required: true, onChange: onChangeValue })}
          />
          <label htmlFor="">Email</label>
        </div>
        {errors.email && <p className="error-msg">This field is required</p>}
        <div className="input-group">
          <input
            type={newPasswordVisible ? "text" : "password"}
            id="createpassword"
            placeholder=" "
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              onChange: onChangeValue,
            })}
          />
          <label htmlFor="">Password</label>
          <i
            onClick={() => handleToggle("NewPassword")}
            className={`bx bxs-${newPasswordVisible ? "show" : "hide"} fs-3`}
          ></i>
        </div>
        {errors.password && (
          <p className="error-msg">
            {errors.password.type === "minLength"
              ? "Password must be 8 characters long"
              : errors.password.type === "pattern"
              ? "password must include at least one uppercase, one lowercase, one number and one special character."
              : "This field is required"}
          </p>
        )}
        <div className="input-group">
          <input
            type={confirmNewPasswordVisible ? "text" : "password"}
            id="confirm_password"
            placeholder=" "
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value ===
                (document.getElementById("createpassword") as HTMLInputElement)
                  .value,
            })}
          />
          <label htmlFor="">Confirm Password</label>
          <i
            onClick={() => handleToggle("ConfirmNewPassword")}
            className={`bx bxs-${
              confirmNewPasswordVisible ? "show" : "hide"
            } fs-3`}
          ></i>
        </div>
        {errors.confirm_password && (
          <p className="error-msg ">
            {errors.confirm_password.type === "validate"
              ? "Passwords don't match"
              : "This field is required"}
          </p>
        )}
        <div className="remember">
          <label>
            <input
              type="checkbox"
              checked={logged_in}
              onChange={() => {
                setLoggedIn(!logged_in);
              }}
            />
            Remember me
          </label>
        </div>
        <button className="mt-3" type="submit">
          Sign Up
        </button>
        <div className="signUp-link">
          <p>
            Already have an account?
            <span onClick={handleClick} className="SignInBtn-link">
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
