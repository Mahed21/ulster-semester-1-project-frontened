import React from "react";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import "./Delete.css"; // ensure CSS is imported

const DeleteVideo = (props) => {
  const { _id, title, description, fileId } = props.list;
  const { afterUpdate } = props;
  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/videoDetails/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete item");
        }
        return res.json();
      })
      .then((data) => {
        afterUpdate();
        alert("Item deleted successfully");
      })
      .catch((error) => alert("Error:", error.message));
  };

  return (
    <div className="video-card">
      <video width="100%" height="200" controls>
        <source
          src={`http://localhost:5000/videoDetails/${fileId}`}
          type="video/mp4"
        />
      </video>
      <div>
        <h3>{title}</h3>
        <p className="video-description">{description}</p>
      </div>
      <button className="btn btn-danger" onClick={() => deleteVideo(_id)}>
        Delete
      </button>
    </div>
  );
};

export default DeleteVideo;
