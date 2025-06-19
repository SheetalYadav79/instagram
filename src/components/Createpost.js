import React from 'react'
import "./Createpost.css";

export default function Createpost() {

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
        <button id='post-btn'>Share</button>
      </div>
      {/* image preview */}
      <div className='main-div'>
        <img id='output' src='https://static.vecteezy.com/system/resources/thumbnails/011/621/738/small_2x/image-picture-icon-design-template-free-vector.jpg'/>
        <input type='file' accept='image/*' onChange={(event)=>{loadfile(event)}}/>
      </div>
      {/* details */}
      <div className='details'>
        <div className='card-header'>
            <div className='card-pic'>
                <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
            </div>
            <h5>Sheetal</h5>
        </div>
        <textarea type="text" placeholder='Write a caption'></textarea>
      </div>
    </div>
  )
}
