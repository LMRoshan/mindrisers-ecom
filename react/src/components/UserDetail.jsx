import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
    const {id, name} = useParams()
  return (
    <div className='container'>
        <div className="row">
            <h1>The detail of user number {id}</h1>
            <h3>User Name: {name}</h3>
            <h3>User ID: {id}</h3>
            <p>For more details contact +000000000</p>
        </div>
      
    </div>
  )
}

export default UserDetail
