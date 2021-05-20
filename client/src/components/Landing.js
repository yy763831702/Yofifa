import React from 'react';
import "./Landing.css";
import '../App.css';
import { SiFifa } from "react-icons/si";
import { GiSoccerBall } from "react-icons/gi";

function Landing() {
  return (
    <div className="landing-logo">
        <div className="landing-float-container">

          <div className="landing-float-child">
            <GiSoccerBall className="soccer-logo" />
          </div>
    
          <div className="landing-float-child">
            <SiFifa className="landing-fifa" />
          </div>
  
        </div>
    </div>
  );
}

export default Landing;
