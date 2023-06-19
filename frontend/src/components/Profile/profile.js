
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {Users} from '../Users/users'
import {Chats} from '../Chats/chats'
import { Create } from "../Create/create";

const handleClick = () => {

  const response = fetch('https://chat-backend-86jx.onrender.com/api/logout', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
// .then(() => {window.location.reload()});



};


export const Profile = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://chat-backend-86jx.onrender.com/api/profile', {'credentials': 'include'})
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])
  const css = `
    .id_title {
      margin:0px;
      margin-top:10px;
    }
    .id_result {
      margin:0px;
    }
    
  `
  if (data != undefined && data != 'null') {
  return (
    <>
    <Users />
    <style>{css}</style>
    <h1 className="id_title">Your id</h1>
    <h4 className="id_result" key={data}>{data.user_id}</h4>
    <Chats />
    <Create />
    </>
  )}
  else {
    return (
      <h1>У вас нет прав</h1>
    )
    }
}
