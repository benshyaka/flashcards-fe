import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";
import "./home.css";
import logo from "../public/logo.png"

type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const navigatehome = () =>{
    history.push("/")
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: any) => {
    let params = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("https://flashcards-back-end.herokuapp.com/api", params)
      .then(function (response) {
        //   IF EMAIL ALREADY EXISTS
        if (response.data.success === false) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          localStorage.setItem("auth", response.data.token);
          setTimeout(() => {
            history.push("/");
          }, 3000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const notify = () => toast("Wow so easy!");
  
  return (
    <>
      <div className="container">
        
      <div>
        <button onClick={navigatehome} className="logo"><img  src={logo} alt="fireSpot"/> <h4>Flashcards</h4> </button>
      </div>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="card mb-3 rounded-0" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Login here
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4 rounded-0">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-none rounded-0"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                      </p>
                    )}
                  </div>
                  <div className="mb-3 rounded-0">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none rounded-0"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-primary text-center w-100 shadow-none mb-3 rounded-0"
                      type="submit"
                    >
                      Login
                    </button>
                    <p className="card-text pb-2">
                      Have an Account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="area">
        <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
      </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};
export default Login;