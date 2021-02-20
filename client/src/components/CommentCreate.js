import React, { useState } from "react";
import axios from "axios";
const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://posts.com/posts/" + postId + "/comments", {
      content: comment,
    });
    console.log(postId);
    setComment("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <button>Comment</button>
      </form>
    </div>
  );
};
export default CommentCreate;
