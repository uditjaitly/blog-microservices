import React, {useState,useEffect} from 'react'
import axios from 'axios'
import CommentList from './CommentList'
import CommentCreate from './CommentCreate'
const Posts = () =>{
    const [postList,setPostList]=useState({});
    const getPosts=async()=>{
        const list=await axios.get('http://localhost:4000/posts');
        setPostList(list.data);
        
    }
    
    useEffect(()=>{
        getPosts();
    },[])
    
    const parseList=Object.values(postList);
    

    return(
        <div>
            {parseList.map((post)=>{
                return (<div className="card" style= {{width: '30%'}} key={post.id}>
                    
                        
                        <div >
                            <h3>{post.title}</h3>
                            <CommentList postId={post.id}/>
                            <CommentCreate postId={post.id}/>
                        </div>
                    </div>)
            })}
        
        </div>
    )
}

export default Posts