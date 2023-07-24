import React, { useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const SpeechToText = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSpeechToText = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio_file", e.target.audioFile.files[0]);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/SpeachToText/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscribedText(response.data.transcribed_text);
      setLoading(false);
    } catch (error) {
      console.error("Error transcribing speech:", error);
    }
  };

  const MyText = transcribedText && <p> {transcribedText}</p>;

  return (
    <div>
      <h2>המתמלל</h2>
      <form onSubmit={handleSpeechToText}>
        <input type="file" name="audioFile" accept="audio/*" />
        <button type="submit">Transcribe</button>
      </form>
      {Loading ? <BeatLoader color="#36d7b7" /> : MyText}
    </div>
  );
};

export default SpeechToText;
