import React, { useEffect, useState } from "react";
import { Link, Route, Router } from "react-router-dom";
import { Message } from "../Message/message";

export const Chats = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://chat-backend-86jx.onrender.com/api/chat', {'credentials': 'include', 'method': 'GET', "mode": 'no-cors'})
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, []);


  if (data!='null' && data!=null) {
    console.log(data)
    const chatId = data.map((number) =>
      <li><Link to={`/chatId/${number._id}`}>Чат - {number.relate.map(cons => <span key={cons}>{cons[0]} </span>)}</Link></li>
      
    );

  return (
    <>
    <h1>Chats</h1>
    <ul>{chatId}</ul>
    {/* <h3>Собеседники</h3>
    {chatUsers} */}

    </>
  )}
  
  return <h1>Войдите, чтобы отобразить ваши чаты</h1>
}

