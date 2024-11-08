import React from "react";
import "./Home.css";
import { FaThumbsUp, FaComment } from "react-icons/fa"; // Import icons

const VedioLoad = (props) => {
  const { title, description, fileId, name, uploadDate } = props.list;
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  return (
    <div className="video-card">
      <h3 className="video-description mb-2">
        {name} upload a video on {formatDate(uploadDate)}
      </h3>
      <video width="100%" height="200" controls>
        <source
          src={`http://localhost:5000/videoDetails/${fileId}`}
          type="video/mp4"
        />
      </video>
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <p className="video-description">{description}</p>
      </div>
      <div className="video-actions">
        <button className="action-btn">
          <FaThumbsUp /> Like 1
        </button>
        <button className="action-btn">
          <FaComment /> Comment
        </button>
      </div>
    </div>
  );
};

export default VedioLoad;
