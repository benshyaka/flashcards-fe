import React, { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./home.css";
import logo from "../public/logo.png"


type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  

  
  return (
    <>

      


      <div className="context">
      
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          
          <div>
          <div>
        <button className="logo"><img  src={logo} alt="fireSpot"/> <h4>Flashcards</h4> </button>
      </div>
          </div>
          <div>
            <button type="submit" className="button mt-4" onClick={logout}>
              Login
            </button>
          </div>
        </div>
        <div className="banner">
  
            <h1>Welcome to Flashcards</h1>
            <p>This app helps you to easly memories answers!</p>
            <div>
              <Link to={"/allcards"}><button className="button"> Start Now</button> </Link>
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
    </>
  );
};

export default Home;