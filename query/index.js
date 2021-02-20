const express=require('express')
const cors=require('cors')
const { default: axios } = require('axios')
const app=express()
app.use(cors())
app.use(express.json())
const posts={}

const handleEvents=()=>{
    if(type==="Post Created"){
        const {id, title}=data
        posts[id]={id,title,comments:[]}
    }
    else if(type==="Comment Created"){
        const{id,content,postId,status}=data
        const post=posts[postId]
        post.comments.push({id,content})
        
        
    }
    if(type==="Comment Updated"){
        const{id,content,postId,status}=data
        const comments=posts[postId].comments
        const comment=comments.find((comment)=>{
            return comment.id===id
        })
        comment.status=status
        comment.content=content

    }
}

app.post('/events/',(req,res)=>{
    const type=req.body.type
    const data=req.body.data
    handleEvents(type,data)
    
    console.log(posts)
    res.send({})
})


app.get('/posts/',(req,res)=>{
    res.send(post)

})

app.listen(4002, ()=>{
    console.log("Listening on 4002")
    try{
        const res=await axios.get("http://eventbus-srv:4010/events/")
    }catch(e){
        
    }
    for(let event of res.data){
        handleEvents(event.type,event.data)
    }
})
