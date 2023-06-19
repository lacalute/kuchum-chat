import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({nick: '', password: '' })
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const submitHandler = e => {
    e.preventDefault()
    console.log(JSON.stringify(values))
    setLoading(true)
    fetch('https://chat-backend-86jx.onrender.com/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'https://kuchum-chat.vercel.app/',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(values),
    })

  }
  
  if (isLoading) return <h1>Загрузка...</h1>


  return (
    <>
    <h1>Вход в мессенджер</h1>
    <form method="post" onSubmit={submitHandler}>
      <input required value={values.nick} onChange={e => setValues({ ...values, nick: e.target.value })} id='title' type='text' placeholder='Your Nick' />
      <input required value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} id='title' type='text' placeholder='Your Password' />
      <button className='post_submit' type='submit'>Войти</button>
    </form>
    <h4>Если у вас нет аккаунта, то создайте его прям тут же</h4>
    </>
  )


}