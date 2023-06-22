
import React, { useEffect, useState } from "react";

import {Users} from '../Users/users'
import {Chats} from '../Chats/chats'
import { Create } from "../Create/create";
import { Nav } from '../Nav/nav'
 
export const Id = (id) => {
    return (
      <>
      <h1 className="title_text">Your id</h1>
      <h4 className="id_result">{id.id}</h4>
      </>
    )
  
}


export const Profile = () => {
  const [data, setData] = useState()

  useEffect(() => {

    fetch('http://localhost:8000/api/profile', {'credentials': 'include'})
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
  if (data != undefined && data != 'null' && data != null) {

  return (
    <>
    <Users />
    <Id id={data.user_id} />
    <Chats />
    <Create />
    </>
  )

  }
}
