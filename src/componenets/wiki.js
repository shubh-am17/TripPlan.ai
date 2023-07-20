import React, { useState } from "react";

function Wiki({destination}) {
  const [data, setdata] = useState("");
  // Function to fetch introductory information about a destination from Wikipedia
  async function fetchDestinationInfo(destination) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext=1&exintro&origin=*&titles=${encodeURIComponent(
      destination
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // Process the JSON data to extract the introductory information
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;
      // console.log(extract);
      const paragraphs=extract.split("\n");
      console.log(paragraphs[0]);
      return paragraphs[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  // Example usage
  fetchDestinationInfo(destination)
    .then((info) => {
      // Display the introductory information on your website
    //   console.log(info);
      setdata(info);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return <div>{data}</div>;
}

export default Wiki;
