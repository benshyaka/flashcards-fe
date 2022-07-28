import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./home.css";

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
            <h3 className="m-3">Home</h3>
          </div>
          <div>
            <button type="submit" className="buttons" onClick={logout}>
              Login
            </button>
          </div>
        </div>
        <div className="banner">
  
            <h1>Welcome to Flashcards</h1>
            <p>This app helps you to easly memories answers!</p>
            <div>
              <button type="button"><span></span>Start Now</button>
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