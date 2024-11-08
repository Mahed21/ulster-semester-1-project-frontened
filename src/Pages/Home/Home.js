import React, { useState, useEffect } from "react";
import UseAuth from "../Context/UseAuth";
import VedioLoad from "./VedioLoad";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/videoDetails");
        const data = await response.json();
        setVideos(data); // Set the videos state
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchVideos();
  }, []); // Run this effect only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-list">
      {videos.map((list) => (
        <VedioLoad list={list} key={list._id}></VedioLoad>
      ))}
    </div>
  );
};

export default Home;
