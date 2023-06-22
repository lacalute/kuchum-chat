import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './auth.css'
import ReactLoading from 'react-loading';

export const Auth = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({nick: '', password: '' })
  const [isLoading, setLoading] = useState(false)
  const submitHandler = e => {
    e.preventDefault()

    setLoading(true)
    fetch('https://chat-backend-86jx.onrender.com/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(() => navigate('/profile'))

  }
  if (isLoading){
    return ( 
      <>
      <div className='auth'>
      <h1 className='title_text'>Вход в Kuchat</h1>
      <form method="post" onSubmit={submitHandler}>
        <input className='input' required value={values.nick} onChange={e => setValues({ ...values, nick: e.target.value })} id='title' type='text' placeholder='Your Nick' />
        <input className='input' required value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} id='title' type='text' placeholder='Your Password' />
        <button className='post_submit' type='submit'><ReactLoading className='loading-spin' type='bars' color='#fff' height={18} width={18} /></button>
      </form>
      <h4 className='info'>Если у вас нет аккаунта, то создайте его прям тут же</h4>
    </div>     
      </>
    )  
  }
  return (
    <>
    <div className='auth'>
      <h1 className='title_text'>Вход в Kuchat</h1>
      <form method="post" onSubmit={submitHandler}>
        <input className='input' required value={values.nick} onChange={e => setValues({ ...values, nick: e.target.value })} id='title' type='text' placeholder='Your Nick' />
        <input className='input' required value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} id='title' type='text' placeholder='Your Password' />
        <button className='post_submit' type='submit'>Войти</button>
      </form>
      <h4 className='info'>Если у вас нет аккаунта, то создайте его прям тут же</h4>
    </div>
    </>
  )


}