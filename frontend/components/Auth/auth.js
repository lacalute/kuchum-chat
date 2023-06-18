'use client'
import { useEffect, useState } from 'react'

export const Auth = () => {
  const [values, setValues] = useState({nick: '', password: ''})
  const submitHandler = e => {
    e.preventDefault()
    console.log(JSON.stringify(values))
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })

    console.log(values)
  }

  return (
    <>
    <form method="post" onSubmit={submitHandler}>
      <input required value={values.nick} onChange={e => setValues({ ...values, nick: e.target.value })} placeholder="Nick"></input>
      <input required value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} placeholder="Password"></input>
      <button type='submit'>Войти</button>
    </form>
    </>
  )
}