import React from "react";
import "../styles/home.css";
import Login from "./Login";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="supercontainer">

    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Hi There!</h2>
          <p>WELCOME TO</p>
          <h1 className="brand">Sakhi</h1>
        </div>
        <div className="buttons">
            <Link to={'/login'}>
          <button className="primary">
              I have an account
          </button>
            </Link>
            <Link to={'/signup'}>
          <button className="primary" >
              Create Account
          </button>
            </Link>
          <Link to="/emergency" className="sos" >EMERGENCY SOS 🚨</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;