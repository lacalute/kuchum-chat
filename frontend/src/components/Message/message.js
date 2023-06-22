import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

export function Message() {
  const {chat_id} = useParams();
  const [userId, setUserId] = useState()
  const [msg, setMsg] = useState()
  const [values, setValues] = useState({message: ''})

  const socket = new WebSocket(`wss://chat-backend-86jx.onrender.com/ws/${chat_id}`);

  useEffect(() => {
    fetch('https://chat-backend-86jx.onrender.com/api/profile', {'credentials': 'include'})
      .then(res => res.json())
      .then(data => {
        setUserId(data)
      })
  }, [])
  useEffect(() => {
    fetch('https://chat-backend-86jx.onrender.com/api/chat', {'credentials': 'include', 'method': 'GET'})
      .then(res => res.json())
      .then(data => {
        setMsg(data)
      })
  }, [])

  const submitHandler = e => {
    e.preventDefault()
    if (userId != 'null') {
      socket.send(JSON.stringify({'msg': values.message, 'id': userId.user_id}))
    }
    setValues({message: ''})
  }
  useEffect(() => {
    socket.onmessage = function(event) {
      setMsg(JSON.parse(event.data))
    };
  }, [])
  
  
  console.log(msg)
  if (!msg) return 
   return (
    <>
    {msg.map(msg => 
      <div>
        <h1 className="user_name" key={msg}>@{msg.user[1]}</h1>
        <h3 className="user_message" key={msg}>{msg.message}</h3>
        <hr></hr>
      </div>
    )}
    <form method="post" onSubmit={submitHandler}>
    <input value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} placeholder="Написать сообщение"></input>
    <button type="submit">отправить</button>
    </form>
    <a href='/'>Выйти из чата</a>
    </>
  )

}



    // fetch(`http://localhost:8000/api/message?chat_id=${chat_id}`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify(values),
    // }).then(() => window.location.reload())