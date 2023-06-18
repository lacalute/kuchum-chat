'use client'
import { useEffect, useState } from 'react'

export const Profile = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('http://127.0.0.1:8000/api/profile')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <h1>You don't have token</h1>
  if (data != null){
  return (
    <>
    <h1>YOUR ID</h1>
    <h3>a</h3>
    </>
  )}
}