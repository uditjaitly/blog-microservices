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
    //console.log(commentsByPostId)
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async(req,res)=>{
    const commentId=randomBytes(4).toString('hex')
    const content=req.body.content
    const comments=commentsByPostId[req.params.id] || []
    comments.push({id:commentId,content:content, status:'pending'})
    commentsByPostId[req.params.id]=comments
    try{
        await axios.post('http://eventbus-srv:4010/events',{
            type:"Comment Created",
            data:{
                id:commentId,
                content:content,
                postId:req.params.id,
                status:'pending'
    
            }
        })
    }
    catch(e){
        return res.send(e)
    }
    res.status(201).send(commentsByPostId[req.params.id])
})

app.post('/events/',async (req,res)=>{
    console.log("Received event",req.body.type)
    if(req.body.type==="Comment Moderated"){
        const {postId, id, status, content}=req.body.data
        const comments=commentsByPostId[postId]
        const comment=comments.find((comment)=>{
            return comment.id===id;
        })
        comment.status=status;
        try{
            await axios.post('http://localhost:4010/events',{
                type:"Comment Updated",
                data:{
                    id,postId,status,content
                }
            })
        }
        catch(e){
            return res.send(e)
        }
    }
    res.send({})
})
app.listen(4001,()=>{
    console.log("Listening on port 4001")
})