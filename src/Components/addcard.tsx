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
  const options = [
    {
      label: "ICT",
      value: "ICT",
    },
    {
      label: "PROGRAMMING",
      value: "PROGRAMMING",
    },
    {
      label: "GEOGRAPHY",
      value: "GEOGRAPHY",
    },
  ];
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
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}

        >
          <div>
        <button onClick={navigatehome} className="logo"><img  src={logo} alt="fireSpot"/> <h4>Flashcards</h4> </button>
      </div>
          <div className="card mb-3 mt-3 rounded-0" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Add new card
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-0"
                        id="exampleFormControlInput1"
                        {...register("firstname", {
                          required: "Firstname is required!",
                        })}
                      />
                      {errors.firstname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Category</label>
                      <select className="form-control form-control-sm  rounded-0">
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Question</label>
                    <input
                      type="text"
                      className="form-control form-control-sm  rounded-0"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Answer</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-0"
                      id="exampleFormControlInput5"
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
                      className="btn btn-primary text-center w-100 shadow-none mb-3  rounded-0"
                      type="submit"
                    >
                      Save
                    </button>
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