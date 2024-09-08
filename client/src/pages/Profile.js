import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const {user} = useContext(AuthContext);

  return (
    <div>
      <h2>Profile Page</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user._id}</p>
    </div>
  )
}

export default Profile;