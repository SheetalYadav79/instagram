import React, { useEffect, useState } from 'react';
import "./Profile.css";
import PostDetail from './PostDetail';

export default function Profile() {
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleDetails = (posts) => {
    setPosts(posts);
    setShow(!show);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        setPic(result);
      })
      .catch(err => {
        console.log("Fetch error", err);
      });
  }, []);

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img
            src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D'
            alt='Profile'
          />
        </div>
        <div className='profile-data'>
          <h1>{user.name || "Guest"}</h1>
          <div className='profile-info' style={{ display: "flex" }}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>

      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />

      <div className='gallery'>
        {Array.isArray(pic) && pic.map((pic, i) => (
          <img
            key={i}
            src={pic.photo}
            className='item'
            alt='User Post'
            onClick={() => {
              toggleDetails(pic); // ✅ FIXED
            }}
          />
        ))}
      </div>

      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
    </div>
  );
}
