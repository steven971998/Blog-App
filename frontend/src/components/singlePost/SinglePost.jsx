import './singlepost.css'
import {Link, useLocation} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { Context } from '../../context/Context';

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]; //It will give the id of the post.
    const [post,setPost] = useState({})
    const PF = "http://localhost:5000/images/"
    const {user} = useContext(Context)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setupdateMode] = useState(false)

    useEffect(() => {
      const getPost = async ()=>{
        const res = await axios.get("/posts/"+path)
        setPost(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)
    }
    getPost()
    }, [path]) //Whenever the path changes, run this function.

    //To update a post.
    const handleUpdate =async()=>{
        try{
            await axios.put(`/posts/${post._id}` , {
                username: user.username, title, desc})
            setupdateMode(false)
        }
        catch(err){
            console.log(err)
        }
    }

    //To delete a post.
    const handleDelete =async()=>{
        try{
            await axios.delete(`/posts/${post._id}` , {
                data: {username: user.username},})
            window.location.replace("/");
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {post.photo && ( 
            <img className='singlePostImg' src={PF + post.photo} alt=''/>
            )} {
                updateMode ? <input type='text' value={title} autofocus className='singlePostTitleInput' onChange={(e)=>setTitle(e.target.value)} /> : (

                    <h1 className='singlePostTitle'>{title}
        {post.username === user?.username && (
            <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={(e)=>setupdateMode(true)}></i>
            <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
            </div>
        )}
            </h1>
                )
            }
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Author: 
                <Link to={`/?user=${post.username}`} className='link'>
                <b>{post.username}</b>
                </Link>
                </span>
                <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? ( <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)} />): (
            <p className='singlePostDesc'>{desc}</p>
            )}
            {updateMode && (
            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
            )}
        </div>
    </div>
  )
}
