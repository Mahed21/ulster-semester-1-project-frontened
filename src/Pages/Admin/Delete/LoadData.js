import React from "react";
import DeleteVideo from "./DeleteVideo";
import { useQuery } from "@tanstack/react-query";

const LoadData = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://ulster-sem1-server-b0hbh5gsdwcqhah3.uksouth-01.azurewebsites.net/videoDetails"
      ).then((res) => res.json()),
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
    <div className="video-grid">
      {data.map((list) => (
        <DeleteVideo list={list} key={list._id} afterUpdate={() => refetch()} />
      ))}
    </div>
  );
};

export default LoadData;
