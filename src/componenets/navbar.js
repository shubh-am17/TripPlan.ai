import React from "react";
import logo from "../assets/logo.svg";
import gitlogo from "../assets/github.svg";
function navbar() {
  return (
    <nav className="nav">
      <div className="ham">
        <svg
          
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="white"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>

      <div className="heading">
        <img src={logo} height={"50px"} alt="logo" />
        <h1 id="site-name">TripPlan.ai</h1>
      </div>

      <div className="nav-links">
        <a
          href="https://github.com/shubh-am17/TripPlan.ai"
          target="blank"
        >
          <img className="logo" src={gitlogo} height={"30px"} alt="github" />
        </a>
      </div>
    </nav>
  );
}

export default navbar;
