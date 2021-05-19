import React from 'react';
import "./Landing.css";
import { SiFifa } from "react-icons/si";
import { GiSoccerBall } from "react-icons/gi";

function Landing() {
  return (
    <div className="logo">
        <div className="float-container">

          <div className="float-child">
            <GiSoccerBall className="App-logo" />
          </div>
    
          <div className="float-child">
            <SiFifa className="fifa" />
          </div>
  
        </div>
    </div>
  );
}

export default Landing;
