const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/events/", async (req, res) => {
  const comment = req.body.data.content;
  const status = comment.includes("Orange") ? "rejected" : "approved";

  await axios.post("http://evenbus-srv:4010/events/", {
    type: "Comment Moderated",
    data: {
      id: req.body.data.id,
      postId: req.body.data.postId,
      status,
      content: req.body.data.content,
    },
  });
  console.log(req.body.data.type);
  res.send({});
});

app.listen(4003, () => {
  console.log("Serving at port 4003");
});
