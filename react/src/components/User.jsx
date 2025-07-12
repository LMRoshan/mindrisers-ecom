import React from 'react'
import { useNavigate } from 'react-router-dom';

const User = () => {

    const users = [
        { id: 1, name: "John"},
        { id: 2, name: "Jane"},
        { id: 3, name: "Alice"},
        { id: 4, name: "Bob"}
    ];

    const navigate = useNavigate();

    const handleClick = (userID, username) => {
        navigate(`/users/${userID}/${username}`);
    }
  return (
    <div className='container'>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
            <li key={user.id} onClick={() => {handleClick(user.id, user.name)}}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
