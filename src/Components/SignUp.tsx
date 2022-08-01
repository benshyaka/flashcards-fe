import React, { FC } from "react";
import { Link, RouteComponentProps} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./home.css";
import logo from "../public/logo.png"


type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const navigatehome = () =>{
    history.push("/")
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = async (data: any) => {
    const {firstname, surname, email, password } = data

    const querydata = { 
      query: `mutation{
        Postsignup(firstname: "${firstname}", surname: "${surname}",email: "${email}", password: "${password}") {
          token
          user {
            id
            firstname
            surname
            email
            password
            createdAt
          }
        }
      }`,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    await axios
      .post("https://flashcards-back-end.herokuapp.com/api", querydata)
      .then(function (response) {
        console.log(response)
        if (response.data.data.Postsignup == null) {
          toast.error("User with the same email exist")

        } else if(response.data.error){
          toast.error("An error occured "+ response.data.error)
        }
         else {
          toast.success("wellcome "+response.data.data.Postsignup.user.firstname)
          localStorage.setItem("auth", response.data.data.Postsignup.token);
          setTimeout(() => {
            history.push("/dashboard");
          }, 3000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}

        >
          <div>
        <button onClick={navigatehome} className="logo"><img  src={logo} alt="fireSpot"/> <h4>Flashcards</h4> </button>
      </div>
          <div className="card mb-3 mt-3 rounded-0" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Register here
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Firstname</label>
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
                          Firstname is required!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Surname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm  rounded-0"
                        id="exampleFormControlInput2"
                        {...register("lastname", {
                          required: "Lastname is required!",
                        })}
                      />
                      {errors.lastname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Surname is required!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm  rounded-0"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        Email is required!
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm rounded-0"
                      id="exampleFormControlInput5"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        Password is required!
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm  rounded-0"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "Confirm Password is required",

                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match.",
                      })}
                    />
                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        Confirm Password is required
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-primary text-center w-100 shadow-none mb-3  rounded-0"
                      type="submit"
                    >
                      Register
                    </button>
                    <p className="card-text">
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
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

export default SignUp;