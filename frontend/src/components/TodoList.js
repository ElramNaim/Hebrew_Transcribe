import React from "react";
import axios from "axios";

const MyComponent = () => {
  const handleAudioRecognition = () => {
    const input = "../audio/shrag.ogg";
    const formData = new FormData();
    formData.append("audio", input);

    axios
      .post("http://localhost:8000/recognize-audio/", formData)
      .then((response) => {
        const data = response.data;
        console.log("Recognized text:", data.text);
        // Do something with the recognized text in your React application
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleAudioRecognition}>Recognize Audio</button>
    </div>
  );
};

export default MyComponent;

//recognize-audio/
//http://localhost:8000/api/todos/
