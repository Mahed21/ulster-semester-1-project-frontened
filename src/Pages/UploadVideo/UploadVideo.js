import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadVedio.css";
import UseAuth from "../Context/UseAuth";

const UploadVideo = () => {
  const { user } = UseAuth();

  let navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the upload starts

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("name", user.displayName);
    formData.append("email", user.email);

    const initialLikes = [{ username: "", useremail: "" }];
    const initialComments = [
      { username: "", useremail: "", comment: "", time: "" },
    ];
    formData.append("likes", JSON.stringify(initialLikes)); // Backend can parse this field as JSON
    formData.append("comments", JSON.stringify(initialComments));

    try {
      const response = await fetch("http://localhost:5000/videoDetails", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Video uploaded successfully!");
        navigate("/"); // Redirect to home page
      } else {
        alert("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false); // Set loading to false after the upload process
    }
  };

  return (
    <div>
      <div className="upload_video_page">
        <div className="d-flex justify-content-center p-5 align-items-center">
          <div className="login p-5">
            <h4 className="signup ps-4 pe-4 pt-3 pb-3 text-center">
              Upload Video
            </h4>
            <input
              type="file"
              accept="video/*"
              className="mt-4 p-1 w-100"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            <input
              placeholder="Video Title"
              type="text"
              className="mt-4 p-1 w-100"
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="mt-4 p-1 w-100"
              rows="4"
              onChange={(e) => setVideoDescription(e.target.value)}
            />
            <button className="login-btn pt-2 pb-2" onClick={handleVideoUpload}>
              Submit
            </button>

            {/* Show loading spinner while uploading */}
            {loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
