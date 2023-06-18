'use client'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import {Users} from '../../components/Users/users'
import {Auth} from '../../components/Auth/auth'
import {Profile} from '../../components/Profile/profile'

export default function Home() {
  return (
    <>
    <Users />
    <Auth />
    </>
  )
}
