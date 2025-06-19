import React from 'react'
import "./Profile.css";

export default function Profile() {
  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className='profile-frame'>
        {/* profile-pic */}
        <div className='profile-pic'>
          <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        </div>
        {/* profile data */}
        <div className='profile-data'>
          <h1>Sheetal Yadav</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>
<hr style={{width:"90%", opacity:"0.8", margin:"25px auto"}}/>
      {/* Gallery */}
      <div className='gallery'>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
        <img src='https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D' alt=''/>
      </div>
    </div>
  )
}
