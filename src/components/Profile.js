import React, { useEffect, useState } from 'react';
import "./Profile.css";

export default function Profile() {
  const [pic, setPic] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result); // for debugging
        setPic(result); // make sure `myposts` matches your API response key
      })
      .catch(err=>{
          console.log("Fetch error", err);
      })
  }, []);

  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className='profile-frame'>
        {/* profile-pic */}
        <div className='profile-pic'>
          <img
            src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D'
            alt=''
          />
        </div>
        {/* profile data */}
        <div className='profile-data'>
          <h1>Sheetal Yadav</h1>
          <div className='profile-info' style={{ display: "flex" }}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>

      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />

      {/* Gallery */}
      <div className='gallery'>
        {Array.isArray(pic) && pic.map((pic, i) => (
          <img key={i} src={pic.photo} className='item' alt='' />
        ))}
      </div>
    </div>
  );
}
