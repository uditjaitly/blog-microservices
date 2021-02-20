import React, { useState } from "react";
import axios from "axios";
const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Enter Your Post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
