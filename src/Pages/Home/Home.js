import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../Context/UseAuth";
import VedioLoad from "./VedioLoad";
import "./Home.css";

const Home = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/videoDetails").then((res) => res.json()),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No videos available</p>;
  }

  return (
    <div className="video-list">
      {data.map((list) => (
        <VedioLoad list={list} key={list._id} afterUpdate={() => refetch()} />
      ))}
    </div>
  );
};

export default Home;
