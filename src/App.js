import React, { useState } from "react";
import "./App.css";
import Navbar from "./componenets/navbar";
import bg from "./assets/bg.mp4";
import drop from "./assets/down-arrow.svg";
import up from "./assets/up-arrow.svg";
import loader from "./assets/loader.svg";
import Options from "./componenets/Options.js";
import DropDown from "./componenets/DropDown.js";
import Wiki from './componenets/wiki'
import parse, { domToReact } from 'html-react-parser';

import { Configuration, OpenAIApi } from "openai";
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY })
);


function App() {
  const [Destination, setDestination] = useState("");
  const [Budget, setBudget] = useState("5000 INR");
  const [Duration, setDuration] = useState("");
  const [selectedInterest, setselectedInterest] = useState([]);
  const [selectedCuisines, setselectedCuisines] = useState([]);
  const [selectedaccommodationTypes, setselectedaccommodationTypes] =
    useState("Hotel");
  const [selectedtravelStyle, setselectedtravelStyle] = useState("Cultural");
  const [Transport, setTransport] = useState("");
  const [selectedactivityTypes, setselectedactivityTypes] = useState([]);
  const [result, setResult] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);

  const handleGenerate = async () => {
    setIsResult(!isResult);
    setisCollapsed(true);
    let interests="";
    let cuisines="";
    let activityTypes="";
    for(let i=0;i<selectedInterest.length;i++){
      interests+=selectedInterest[i]+",";
    }
    for(let i=0;i<selectedCuisines.length;i++){
      cuisines+=selectedCuisines[i]+",";
    }
    for(let i=0;i<selectedactivityTypes.length;i++){
      activityTypes+=selectedactivityTypes[i]+",";
    }
    try {
      console.log("Generating plan...");
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert Travel Planner." },
          {
            role: "user",
            content: `Generate a personalized travel itinerary for a trip to ${Destination} with a budget of ${Budget}. The traveler is interested in a ${Duration} days vacation and enjoys ${interests}. Their accomodation preference is ${selectedaccommodationTypes} and they prefer ${Transport} transportation. The itinerary should include ${activityTypes} activities and ${cuisines} dining options. Please provide a detailed itinerary with daily recommendations for ${Duration} days, including suggested destinations, activities, and dining options.Mention Distance of places from the main city and also tell the reason why you recommend that place. Return the itinerary in a HTML format without metadata , CSS ,body,head tags so that I can directly put it into website.`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });
      console.log(response);
      if (response.data.choices && response.data.choices.length > 0) {
        const generatedSummary = response.data.choices[0].message.content;
        setResult(generatedSummary);
        console.log(generatedSummary);
        setIsResultReady(!isResultReady);
      } else {
        console.error("Error: Empty response");
      }
    } catch (error) {
      console.error("Error: :(", error);
    }
  };

  const interests = [
    "Adventure",
    "Beach",
    "City",
    "Cultural",
    "Food",
    "Historical",
    "Nature",
    "Religious",
    "Shopping",
    "Wildlife",
  ];
  const cuisines = [
    "American",
    "Chinese",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Thai",
    "Traditional",
  ];
  const accommodationTypes = [
    "Hotel",
    "Boutique Hotel",
    "Hostel",
    "Resort",
    "Vacation Rental",
    "Camping",
    "Homestay",
    "Bed and Breakfast",
    "Don't want to stay",
  ];
  const travelStyles = [
    "Cultural",
    "Adventure",
    "Relaxation",
    "Beach",
    "City Break",
    "Road Trip",
    "Wildlife Safari",
    "Ski",
  ];
  const activityTypes = [
    "Outdoor",
    "Sightseeing",
    "Shopping",
    "Nightlife",
    "Museums",
    "Theme Parks",
    "Water Sports",
    "Yoga and Wellness",
  ];
  const hide = {
    display: "none",
  };

  return (
    <div className="container">
      <Navbar />

      <div className="box">
        <video id="video" autoPlay loop muted>
          <source src={bg} type="video/mp4" />
        </video>

        <div className="after-result">
          <div className={isCollapsed ? "content-collapse" : "content"}>
            <div className="content-heading">
              <h1>
                {isResult ? "Edit your preferences" : "Enter your preferences"}
              </h1>
              {isResult ? (
                isCollapsed ? (
                  <img
                    src={drop}
                    className="drop-btn"
                    onClick={() => setisCollapsed(!isCollapsed)}
                  />
                ) : (
                  <img
                    src={up}
                    className="up-btn"
                    onClick={() => setisCollapsed(!isCollapsed)}
                  />
                )
              ) : null}
            </div>
            <div className="text-input">
              <p label for="destination">
                Enter your destination
              </p>
              <input
                type="text"
                id="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="acco-travel">
                <div className="text-input">
                  <p>Choose your budget (with currency)</p>
                  <input
                    type="text"
                    id="text"
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div className="text-input">
                  <p>Number of days </p>
                  <input
                    type="text"
                    id="text"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
            </div>
            
            <div className="select-btn">
              <p>Choose your interest</p>
              <Options
                array={interests}
                selectedOptions={selectedInterest}
                setSelectedOptions={setselectedInterest}
              />
            </div>
            <div className="select-btn">
              <p>Cuisine preference</p>
              <Options
                array={cuisines}
                selectedOptions={selectedCuisines}
                setSelectedOptions={setselectedCuisines}
              />
            </div>

            <div className="select-btn">
              <p>Activity type</p>
              <Options
                array={activityTypes}
                selectedOptions={selectedactivityTypes}
                setSelectedOptions={setselectedactivityTypes}
              />
            </div>
            <div className="text-input">
              <p>Transportation Type:</p>{" "}
              <input
                type="text"
                id="text"
                onChange={(e) => setTransport(e.target.value)}
              ></input>
            </div>
            <div class="acco-travel">
              <div className="drop-menu">
                <p>Accomodation</p>
                <DropDown
                  array={accommodationTypes}
                  selectedOption={selectedaccommodationTypes}
                  setSelectedOption={setselectedaccommodationTypes}
                />
              </div>
              <div className="drop-menu">
                <p>Travel Style</p>
                <DropDown
                  array={travelStyles}
                  selectedOption={selectedtravelStyle}
                  setSelectedOption={setselectedtravelStyle}
                />
              </div>
            </div>
            <button className="btn" onClick={handleGenerate}>
              Generate
            </button>
          </div>

          <div className="content" style={isResult ? null : hide}>
            <Wiki destination={Destination} />
            {isResultReady & isResult ? (
              <h1> Your plan is ready </h1>
            ) : (
              <img src={loader} className="loader" />
            )}
            <span>{parse(result)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
