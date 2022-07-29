import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import addcard from "./Components/addcard";
import getcards from "./Components/getcards";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={SignUp} />
        <Route path="/addcard" component={addcard}/>
        <Route path="/allcards" component={getcards}/>
        <Route path="/" component={Home} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;