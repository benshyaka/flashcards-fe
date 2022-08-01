import React, { FC,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";
import "./home.css";
import logo from "../public/logo.png"
import user from "../public/user.bmp"

localStorage.setItem("nextcard", "1");

type SomeComponentProps = RouteComponentProps;
const Switchcards: FC<SomeComponentProps> =  ({ history }): JSX.Element => {


  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  const navigatehome = () =>{
    history.push("/")
    
  }
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  // let nextcard = Number(localStorage.getItem("nextcard")) 

  const getcard =  () => {
    setIsLoading(true)
    var nextcardnbr = Number(localStorage.getItem("nextcard")) 
    const querydata = { 
      query: `query Card {
        card(id: ${nextcardnbr}) {
          id
          question
          createdAt
          updatedAt
          answer
          postedById
          status
          categoryid
        }
      }`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

       axios
      .post("https://flashcards-back-end.herokuapp.com/api", querydata)
      .then(function (response) {
        const jsondata = response.data.data.card
        console.log(response)
        if (response.data.data.card == null) {
          setIsLoading(false)
          toast.error("You have get to end! restarting now")
          localStorage.removeItem('nextcard')
        } else {
          
          // setTimeout(() => {
            // history.push("/dashboard");
          setIsLoading(false)

            setData(jsondata)
          // }, 2000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }
    
  const prevone = () => {
    var curre = Number(localStorage.getItem("nextcard")) 
    // localStorage.removeItem('nextcard')
    var curre2 = curre - 1
    localStorage.setItem("nextcard", curre2.toString());
    handleClick()
    getcard()
  }

  const nextone = () => {
    var curr = Number(localStorage.getItem("nextcard")) 
    var curr3 = curr + 1
    localStorage.setItem("nextcard", curr3.toString());
    handleClick()
    getcard()
  }
   
   useEffect(() => {
    getcard()
  }, [])
  
  return (
    <>
{isLoading && <p>Loading...</p>}
{Object.keys(data).length > 0 && (
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
         <button type="submit" className="button mt-4" onClick={logout}>
                Login
              </button>
            </div>
       </div>
      </nav>
      <div className="card-container mt-5">
          <div className="flip-card col-4" >
            <div className="flip-card-inner" style={{ transform: isActive ? 'rotateY(180deg)': ''}}>
              <div className="flip-card-front">
                <div className="card back bg-none mt-5 border-0">
                  <div className="card-block">
                    <h4 className="card-title">
                      <pre>
                        <code>
                          Card {Object["values"](data)[0]}
                          
                        </code>
                      </pre> 
                    </h4>
                    <h3 className="card-subtitle mb-2 text-muted">{Object["values"](data)[1]}</h3>
                    <p className="card-text"> Created on: {Object["values"](data)[2]}</p>
                    <button
                      className="buttons btn btn-primary"
                      onClick={handleClick}
                    >
                      View answer
                    </button>
                    {/* <a href="#" className="buttons btn btn-primary btn-sm">Next question</a> */}
                  </div>
                </div>
                
              </div>
              <div className="flip-card-back">
              <div className="card back text-black mt-5 border-0">
                  <div className="card-block">
                    <h5 className="card-title">Answer is:</h5>
                    <h3 className="card-text">
                    {/* {data[0].answer} */}
                    {Object["values"](data)[4]}

                    </h3>
                    
                    <button
                      className="buttons btn btn-primary"
                      onClick={handleClick}
                    >
                      Mark as read
                    </button>
                    <button
                      className="buttons btn btn-primary"
                      onClick={nextone}
                    >
                      Next question
                    </button>

                    <button
                      className="buttons btn btn-primary"
                      onClick={prevone}
                    >
                      Previous question
                    </button>
  
                  </div>
                </div>
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
)}



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
export default Switchcards;