const express=require('express')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const app=express()
const axios=require('axios')
app.use(cors())
app.use(express.json())

const commentsByPostId={};

app.get(('/posts/:id/comments'),(req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async(req,res)=>{
    const commentId=randomBytes(4).toString('hex')
    const content=req.body.content

    const comments=commentsByPostId[req.params.id] || []
    comments.push({id:commentId,content:content})
    commentsByPostId[req.params.id]=comments
    await axios.post('http://localhost:4010/events',{
        type:"Comment Created",
        data:{
            id:commentId,
            content:content,
            postId:req.params.id
        }
    })
    res.status(201).send(commentsByPostId[req.params.id])
})

app.post('/events/',(req,res)=>{
    console.log("Received event",req.body.type)
    res.send({})
})
app.listen(4001,()=>{
    console.log("Listening on port 4001")
})