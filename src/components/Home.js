import React from 'react'
import "./Home.css";

export default function Home() {
  return (
    <div className='home'>
      {/* card */}
      <div className='card'>
        {/* card header */}
        <div className='card-header'>
          <div className='card-pic'>
            <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
          </div>
          <h5>Sheetal</h5>
        </div>

        {/* card image */}
        <div className='card-image'>
          <img src='https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' alt=''/>
        </div>

        {/* card content */}
        <div className='card-content'>
          <span className="material-symbols-outlined">favorite</span>
          <p>1 Like</p>
          <p>This is amazing</p>
        </div>

        {/* add comment */}
        <div className='add-comment'>
          <span className="material-symbols-outlined">mood</span>
          <input type='text' placeholder='Add a comment'/>
          <button className='comment'>Post</button>
        </div>
      </div>
    </div>
  )
}
