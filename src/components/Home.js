import React, { useEffect, useState } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // ✅ Safely parse user info
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }

    // Fetching all posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + token
      },
    }).then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err));
  }, [navigate]);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          return posts._id === result._id ? result : posts;
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          return posts._id === result._id ? result : posts;
        });
        setData(newData);
      });
  };

  return (
    <div className='home'>
      {data.length > 0 && data.map((posts) => (
        <div className='card' key={posts._id}>
          {/* card header */}
          <div className='card-header'>
            <div className='card-pic'>
              <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt='' />
            </div>
            <h5>{posts.postedBy?.name || "Unknown"}</h5>
          </div>

          {/* card image */}
          <div className='card-image'>
            <img src={posts.photo} alt='' />
          </div>

          {/* card content */}
          <div className='card-content'>
            {posts.likes.includes(user._id) ? (
              <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(posts._id)}>favorite</span>
            ) : (
              <span className="material-symbols-outlined" onClick={() => likePost(posts._id)}>favorite</span>
            )}
            <p>{posts.likes.length} Likes</p>
            <p>{posts.body}</p>
          </div>

          {/* add comment */}
          <div className='add-comment'>
            <span className="material-symbols-outlined">mood</span>
            <input type='text' placeholder='Add a comment' />
            <button className='comment'>Post</button>
          </div>
        </div>
      ))}
    </div>
  );
}
