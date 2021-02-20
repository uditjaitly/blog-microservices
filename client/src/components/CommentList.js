import React, { useEffect, useState } from "react";
import axios from "axios";
const CommentList = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);

  const getComments = async () => {
    const reply = await axios.get(
      "http://posts.com/posts/" + postId + "/comments"
    );
    setCommentList(reply.data);
  };

  useEffect(() => {
    getComments();
  }, []);
  console.log(commentList);

  return (
    <div>
      <p>{commentList.length} Comments</p>
      {commentList.map((comment) => {
        let cmt;
        if (comment.status === "pending") {
          cmt = "Awaiting Moderation";
        } else if (comment.status === "approved") {
          cmt = comment.content;
        } else if (comment.status === "rejected") {
          cmt = "Comment Banned";
        }
        return (
          <div key={comment.id}>
            <p>{cmt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
