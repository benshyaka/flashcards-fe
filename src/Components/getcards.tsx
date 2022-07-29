import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";
import "./home.css";
import logo from "../public/logo.png"
import user from "../public/user.bmp"


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

  

  

  const notify = () => toast("Wow so easy!");
  
  return (
    <>

   

<div className="container">
<nav className="navbar navbar-expand-sm me-4">
     <div className="container-fluid ms-4">
       <a className="navbar-brand" href="#">
        <button onClick={navigatehome} className="dashboardbutton"><img  src={logo} alt="fireSpot"/> <h5>Flashcards</h5> </button>
       </a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarCollapse">
         <ul className="navbar-nav">
           <li className="nav-item active">
             <a className="nav-link" aria-current="page" href="/">Home</a>
           </li>
           <li className="nav-item">
             <a className="nav-link" href="/addcard">cards</a>
           </li>
           <li className="nav-item">
             <a className="nav-link" href="/addcategory" aria-disabled="true">categories</a>
           </li>
         </ul>
       </div>
       <div>
            <button type="submit" className="button mt-4" >
              Login
            </button>
          </div>
     </div>
   </nav>
        
  <div className="row row_branchen pt-3">

    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
      <div className="card p-4">
          <div className="image__wrapper">
            <div className="card__shadow--1"></div>
          </div>
          <div className="card-body pb-4">
            <h3 className="card-title">USB</h3>
            <p className="card-text">What is USB in full?</p>
          </div>
          <div className="d-flex">
            <button className="btn btn-sm btn-outline-primary w-50">Mark it read</button> &nbsp;
            <button className="btn btn-sm btn-outline-primary w-50">Flip</button>
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