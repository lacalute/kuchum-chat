import React, { useEffect, useState } from "react";

export const Users = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://chat-backend-86jx.onrender.com/api/users', {"mode": 'no-cors'})
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])


  if (data != null){
  return (
    <>
    <h1>Users</h1>
    {data.map(user => <li key={user.nick}>{user.nick}, {user._id}</li>)}
    </>
  )}


}



