import React, { useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const SpeechToText = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSpeechToText = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.audioFile.files[0];

    if (!file) {
      setError("Please select an audio file.");
      return;
    }

    formData.append("audio_file", file);

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
      setError("");
    } catch (error) {
      setTranscribedText("");
      setError("Error transcribing the audio.");
    } finally {
      setLoading(false);
    }
  };

  const MyText = () => <p>{transcribedText}</p>;

  return (
    <div>
      <h2>המתמלל</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSpeechToText}>
        <input type="file" name="audioFile" accept="audio/*" />
        <button type="submit">Transcribe</button>
      </form>
      {loading ? <BeatLoader color="#36d7b7" /> : <MyText />}
    </div>
  );
};

export default SpeechToText;
