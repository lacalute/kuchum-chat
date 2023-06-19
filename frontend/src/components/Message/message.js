import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
export function Message() {
  const {chat_id} = useParams();
  const [values, setValues] = useState({message: ''})
  const submitHandler = e => {
    e.preventDefault()
    console.log(JSON.stringify(values))
    fetch(`https://chat-backend-86jx.onrender.com/api/message?chat_id=${chat_id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(values),
    }).then(() => window.location.reload())
  }
  console.log(values)
  return (
    <>
    <form method="post" onSubmit={submitHandler}>
    <input value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} placeholder="Написать сообщение"></input>
    <button type="submit">отправить</button>
    </form>
    <a href='/'>Выйти из чата</a>
    </>
  )
}