import React, {useState, useEffect} from 'react'
import "./Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Createpost() {
const [body, setBody] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("");
const navigate = useNavigate()

const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg)

useEffect(()=>{
    // saving post in mongodb

    if(url){
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic:url
        })
      }).then(res=>res.json())
    .then(data=> {if(data.error){
      notifyA(data.error)
    }else{
      notifyB("Successfully Posted")
      navigate("/")
    }})
    .catch(err=> console.log(err))
    }
  
},[url])

//posting image to cloudinary
const postDetails = ()=>{
  console.log(body, image)
  const data = new FormData()
  data.append("file", image)
  data.append("upload_preset", "insta-clone")
  data.append("cloud_name","sheetalcloudinary")
  fetch("https://api.cloudinary.com/v1_1/sheetalcloudinary/image/upload", {
    method: "post",
    body : data
  }).then(res=>res.json())
  .then(data => setUrl(data.url))
  .catch(err=> console.log(err))

  
}

    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }} 
  return (
    <div className='createPost'>
        {/* header */}
      <div className='post-header'>
        <h4 style={{margin:"3px auto"}}>Create New Post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/* image preview */}
      <div className='main-div'>
        <img id='output' src='https://static.vecteezy.com/system/resources/thumbnails/011/621/738/small_2x/image-picture-icon-design-template-free-vector.jpg'/>
        <input type='file' accept='image/*' onChange={(event)=>{loadfile(event); setImage(event.target.files[0])}}/>
      </div>
      {/* details */}
      <div className='details'>
        <div className='card-header'>
            <div className='card-pic'>
                <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
            </div>
            <h5>Sheetal</h5>
        </div>
        <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} type="text" placeholder='Write a caption....'></textarea>
      </div>
    </div>
  )
}
