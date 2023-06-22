import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

export const Delete = () => {
  const {chat_id} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
    fetch(`https://chat-backend-86jx.onrender.com/api/chat?chat_id=${chat_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      }
    }).then(() => navigate('/profile'))
    // .then(() => navigate('/profile'))

  }
  const css = `
    .delete_button {
    background-color: red;
    color: white;
    }
    
  `
  
  if (isLoading) return <h1>Удаляем...</h1>

  return (
    <>
    <style>{css}</style>
    <form method="post" onSubmit={submitHandler}>
      <button className='delete_button' type='submit'>Удалить</button>
    </form>
    </>
  )


}