import { useState } from 'react'
import './create.css'

export const Create = () => {
  const [values, setValues] = useState({user_id: ''})
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const submitHandler = e => {
    e.preventDefault()

    setLoading(true)

    fetch(`http://localhost:8000/api/chat?user_id=${values.user_id}`, {
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
    <h1 className="title_text">Создать чат</h1>
    <form method="post" onSubmit={submitHandler}>
      <div className='panel'>
        <input className='input_id' required value={values.nick} onChange={e => setValues({ ...values, user_id: e.target.value })} id='title' type='text' placeholder='Введите id собеседника' />
        <button className='button_id' type='submit'>Создать</button>
      </div>
    </form>
    </>
  )


}