import {useParams} from "react-router-dom";
import { Message } from "../Message/message";
import { Delete } from "../Delete/delete";
import React, { useEffect, useState } from "react";
export const Page = () => {
  const {chat_id} = useParams();
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(`https://chat-backend-86jx.onrender.com/api/chatId/${chat_id}`, {'credentials': 'include', 'method': 'GET', 'mode': 'no-cors',})
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, []);
  const css = `
    .user_name {
      margin: 0px;
      padding: 0px;
    }
    .user_message {
      margin: 0px;
      font-weight: normal;
    }
  `
  if (data!=null){
    console.log(data)
  return (
    <>
    {data.history.map(msg => 
    <div>
      <style>{css}</style>
      <h1 className="user_name" key={msg}>@{msg.user[1]}</h1>
      <h3 className="user_message" key={msg}>{msg.message}</h3>
      <hr></hr>
    </div>)}
    <Message />
    <Delete />
    </>
  )}
}