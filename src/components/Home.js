import React, { useEffect, useState } from 'react';
import "./Home.css";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
      return;
    }

    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + token
      },
    })
      .then(res => res.json())
      .then(result => {
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Expected array, got:", result);
          notifyA(result.error || "Failed to load posts");
          setData([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        notifyA("Server error");
      });
  }, [navigate]);

  const toggleComment = (posts) => {
    setItem(posts);
    setShow(!show);
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
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
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
        setData(newData);
      });
  };

  const makeComment = (text, id) => {
    if (!text.trim()) return;

    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ text, postId: id })
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
        setData(newData);
        notifyB("Comment posted");
        setComment('');
      });
  };

  return (
    <div className='home'>
      {data.map((posts) => (
        <div className='card' key={posts._id}>
          <div className='card-header'>
            <div className='card-pic'>
              <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500' alt='' />
            </div>
            <h5>
              {posts.postedBy ? (
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              ) : (
                "Unknown"
              )}
            </h5>
          </div>

          <div className='card-image'>
            <img src={posts.photo} alt='' />
          </div>

          <div className='card-content'>
            {posts.likes.includes(user._id) ? (
              <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(posts._id)}>favorite</span>
            ) : (
              <span className="material-symbols-outlined" onClick={() => likePost(posts._id)}>favorite</span>
            )}
            <p>{posts.likes.length} Likes</p>
            <p>{posts.body}</p>
            <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleComment(posts)}>View all comments</p>
          </div>

          <div className='add-comment'>
            <span className="material-symbols-outlined">mood</span>
            <input
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className='comment' onClick={() => makeComment(comment, posts._id)}>Post</button>
          </div>
        </div>
      ))}

      {show && item && (
        <div className='showComment'>
          <div className='container'>
            <div className='postPic'>
              <img src={item.photo} alt='' />
            </div>
            <div className='details'>
              <div className='card-header' style={{ borderBottom: "1px solid #00000029" }}>
                <div className='card-pic'>
                  <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500' alt='' />
                </div>
                <h5>{item.postedBy?.name || "Unknown"}</h5>
              </div>

              <div className='comment-section' style={{ borderBottom: "1px solid #00000029" }}>
                {item.comments.map((comment) => (
                  <p className='comm' key={comment._id}>
                    <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy?.name || "User"}</span>
                    <span className='commentText'>{comment.comment}</span>
                  </p>
                ))}
              </div>

              <div className='card-content'>
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>

              <div className='add-comment'>
                <span className="material-symbols-outlined">mood</span>
                <input
                  type='text'
                  placeholder='Add a comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className='comment' onClick={() => makeComment(comment, item._id)}>Post</button>
              </div>
            </div>
          </div>
          <div className='close-comment' onClick={() => toggleComment(null)}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
          </div>
        </div>
      )}
    </div>
  );
}
