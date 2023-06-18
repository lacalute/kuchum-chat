'use client'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })

export const Users = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('http://127.0.0.1:8000/api/users')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  if (data != null){
  const listUsers = data.map(user => <li>Nick: {user.nick}, ID: {user._id}</li>)
  return (
    <>
    <h1>USERS</h1>
      <ul>{listUsers}</ul>
    </>
  )}
}

