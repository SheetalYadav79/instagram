import React, { useEffect, useState } from 'react';
import "./Profile.css";
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const { userid } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setUserData(result.user);
        setPosts(result.posts);
      })
      .catch(err => {
        console.log("Fetch error", err);
      });
  }, [userid]);

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img
            src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500'
            alt='Profile'
          />
        </div>
        <div className='profile-data'>
          <h1>{userData.name || "Guest"}</h1>
          <div className='profile-info' style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>

      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />

      <div className='gallery'>
        {posts.map((post, i) => (
          <img
            key={i}
            src={post.photo}
            className='item'
            alt='User Post'
          />
        ))}
      </div>
    </div>
  );
}
