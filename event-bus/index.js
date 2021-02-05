const express=require('express')
const axios=require('axios')

const app=express()
app.use(express.json())

app.post('/events/',async (req,res)=>{
    const event=req.body;
    console.log(event)
    await axios.post('http://localhost:4000/events',event)
    await axios.post('http://localhost:4001/events',event)
    await axios.post('http://localhost:4002/events',event)
    
    if(event.type==="Comment Created"){
        await axios.post('http://localhost:4003/events',event)
    }

    if(event.type==="Comment Moderated"){
        await axios.post('http://localhost:4001/events',event)
    }
    if(event.type==="Comment Updated"){
        await axios.post('http://localhost:4002/event)',event)
    }

    res.send("Done")

})


app.listen(4010,()=>{
    console.log("Listening to port 4010")
})

