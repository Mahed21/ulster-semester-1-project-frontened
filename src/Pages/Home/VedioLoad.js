import React, { useState } from "react";
import "./Home.css";
import { FaThumbsUp, FaComment } from "react-icons/fa"; // Import icons
import UseAuth from "../Context/UseAuth";

const VedioLoad = (props) => {
  const { user } = UseAuth();
  const { afterUpdate } = props;

  const { title, description, fileId, name, uploadDate, likes, comments, _id } =
    props.list;
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

  const emailExists = likes.filter((like) => like.userEmail === user.email);

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

  const handlelike = async (id) => {
    try {
      const url =
        emailExists.length > 0
          ? `http://localhost:5000/videoDetails/${id}/dislike` // Dislike endpoint
          : `http://localhost:5000/videoDetails/${id}/like`; // Like endpoint

      const response = await fetch(url, {
        method: emailExists.length > 0 ? "DELETE" : "POST", // Use DELETE for dislike
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.displayName,
        }),
      });

      const text = await response.text(); // Get raw response as text
      const data = JSON.parse(text); // Parse the text as JSON
      if (response.ok) {
        afterUpdate(); // Refresh the component data
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error toggling like/dislike:", error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) {
      console.error("Comment cannot be empty");
      return;
    }

    try {
      const url = `http://localhost:5000/videoDetails/${_id}/comment`; // Comment endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.displayName,
          comment: newComment,
          time: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        afterUpdate(); // Refresh the component data
        setNewComment(""); // Clear the comment input
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="video-card">
      <h3 className="video-description mb-2">
        {name} uploaded a video on {formatDate(uploadDate)}
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
        <button
          className="action-btn"
          onClick={(e) => {
            handlelike(_id);
          }}
        >
          <FaThumbsUp />
          {emailExists.length > 0 ? (
            <span>Dislike</span>
          ) : (
            <span>Like</span>
          )}{" "}
          {likes.length > 0 ? likes.length : ""}
        </button>
        <button
          className="action-btn"
          onClick={() => setShowCommentBox(!showCommentBox)} // Toggle comment box visibility
        >
          <FaComment /> Comment {comments.length > 0 ? comments.length : ""}
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="comment-box">
          <textarea
            className="comment-input"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="send-btn" onClick={handleComment}>
            Send
          </button>
        </div>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="comments-section">
          <h4>Comments:</h4>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.userName}</strong> ({formatDate(comment.time)}
                ):
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VedioLoad;
