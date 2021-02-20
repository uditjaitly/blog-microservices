const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
const events=[]
app.post("/events/", async(req, res) => {
  const event = req.body;
  events.push(event);
  console.log(event);
    try{
      await axios.post("http://comments-srv:4001/events", event);
    

    

      await axios.post("http://query-srv:4002/events)", event);

      await axios.post("http://posts-clusterip-srv:4000/events", event);
      await axios.post("http://moderation-srv:4003/events", event);
    }
    catch(e){
      return res.send(e)
    }
  

  res.send("Done");
});
app.get('/events/', (req,res)=>{
  res.send(events)
})
app.listen(4010, () => {
  console.log("Listening to port 4010");
});
