const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const axios=require('axios')
const app=express()
const posts={}
app.use(bodyParser.json())
app.use(cors())
axios.defaults.headers.common = {
    "Content-Type": "application/json"
  }
app.get('/posts/',async(req,res)=>{
    res.send(posts)
})

app.post('/posts/',async(req,res)=>{
    const id=randomBytes(4).toString('hex')
    const title=req.body.title
    posts[id]={
        id:id,
        title:title
    }
    await axios.post('http://localhost:4010/events/',{
        type:'Post Created',
        data:{
            id,
            title
        }
    })
    res.status(201).send(posts[id])
})


app.post('/events/',(req,res)=>{
    console.log("Received event",req.body.type)
    res.send({})
})
app.listen(4000,()=>{
    console.log("Listening on port 4000")
})