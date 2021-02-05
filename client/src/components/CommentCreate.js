import React, {useState} from 'react'
import axios from 'axios'
 const CommentCreate = () =>{

    const [comment,setComment]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:4001/posts/123/comments',{content:comment})
        setComment('')
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter Comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} ></input>
                <button>Comment</button>
            </form>
        
        </div>
     )
 }
 export default CommentCreate