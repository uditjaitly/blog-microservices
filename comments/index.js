const express=require('express')
const {randomBytes}=require('crypto')
const app=express()
app.use(express.json())

const commentsByPostId={};

app.get(('/posts/:id/comments'),(req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',(req,res)=>{
    const commentId=randomBytes(4).toString('hex')
    const content=req.body.content

    const comments=commentsByPostId[req.params.id]
    comments.push({id:commentId,content:content})
    commentsByPostId[req.params.id]=comments
    res.status(201).send(commentsByPostId[req.params.id])
})

app.listen(4001,()=>{
    console.log("Listening on port 4001")
})