import React, { useState } from 'react';
import './PostDetail.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostDetail = ({ item, toggleDetails }) => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const makeComment = (text, postId) => {
    if (!text.trim()) return;
    console.log(`Posted comment: "${text}" on post ID: ${postId}`);
    setComment('');
  };

  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete this post ?")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('Post deleted:', result);
          toggleDetails(); // Close modal
          navigate('/'); 
          notifyB(result.message)  
        })
        .catch((err) => {
          console.error('Delete error:', err);
        });
    }
  };

  return (
    <div className='showComment'>
      <div className='container'>
        <div className='postPic'>
          <img src={item.photo} alt='Post' />
        </div>
        <div className='details'>
          <div className='card-header' style={{ borderBottom: '1px solid #00000029' }}>
            <div className='card-pic'>
              <img
                src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500'
                alt='User profile'
              />
            </div>
            <h5>{item.postedBy?.name || 'Unknown'}</h5>
            <div className='deletePost' onClick={() => removePost(item._id)}>
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>

          <div className='comment-section' style={{ borderBottom: '1px solid #00000029' }}>
            {item.comments.map((comment) => (
              <p className='comm' key={comment._id}>
                <span className='commenter' style={{ fontWeight: 'bolder' }}>
                  {comment.postedBy?.name || 'User'}{' '}
                </span>
                <span className='commentText'>{comment.comment}</span>
              </p>
            ))}
          </div>

          <div className='card-content'>
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          <div className='add-comment'>
            <span className='material-symbols-outlined'>mood</span>
            <input
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className='comment' onClick={() => makeComment(comment, item._id)}>
              Post
            </button>
          </div>
        </div>
      </div>

      <div className='close-comment' onClick={toggleDetails}>
        <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
      </div>
    </div>
  );
};

export default PostDetail;
