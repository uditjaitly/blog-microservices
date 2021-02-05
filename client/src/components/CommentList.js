import React, {useEffect,useState} from 'react'
import axios from 'axios'
const CommentList=({postID})=>{
    const [commentList,setCommentList]=useState([]);

    const getComments=async()=>{
        const reply=await axios.get('http://localhost:4001/posts/123/comments')
        setCommentList(reply.data)
    }


    useEffect(()=>{
        getComments();
    },[])
    console.log(commentList)

    return(
        <div>
            <p>{commentList.length} Comments</p>
            {commentList.map((comment)=>{
                return (<div key={comment.id}>
                        <p>{comment.content}</p>
                    
                    </div>)
            })}
            
        </div>
    )
}

export default CommentList