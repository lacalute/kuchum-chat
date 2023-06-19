import { useState } from 'react'


export const Create = () => {
  const [values, setValues] = useState({user_id: ''})
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const submitHandler = e => {
    e.preventDefault()
    console.log(JSON.stringify(values))
    setLoading(true)
    console.log("HELLO", values)
    fetch(`https://chat-backend-86jx.onrender.com/api/chat?user_id=${values.user_id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      }
    }).then(() => window.location.reload())
    // .then(() => navigate('/profile'))

  }
  const css = `
    input {
      width: 300px;
    }
    
  `
  
  if (isLoading) return <h1>Загрузка...</h1>

  return (
    <>
    <style>{css}</style>
    <h1>Создать чат</h1>
    <form method="post" onSubmit={submitHandler}>
      <input required value={values.nick} onChange={e => setValues({ ...values, user_id: e.target.value })} id='title' type='text' placeholder='Введите id собеседника' />
      <button className='post_submit' type='submit'>Создать</button>
    </form>
    </>
  )


}