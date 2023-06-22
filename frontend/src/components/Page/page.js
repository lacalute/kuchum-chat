import {useParams} from "react-router-dom";
import { Message } from "../Message/message";
import { Delete } from "../Delete/delete";
import useWebSocket from 'react-use-websocket';

import React, { useState } from "react";
  

// export const Page = () => {
//   const {chat_id} = useParams()
//   const [data, setData] = useState()
//   const socket = new WebSocket(`ws://localhost:8000/ws/${chat_id}`);

  

//   // if (data != undefined) {
//   //   return (
//   //     <>
//   //     {data.history.map(msg => 
//   //     <div>
//   //       <h1 className="user_name" key={msg}>@{msg.user[1]}</h1>
//   //       <h3 className="user_message" key={msg}>{msg.message}</h3>
//   //       <hr></hr>
//   //     </div>
//   //     )}
//   //     <Message />
//   //     </>
//   //   )
//   // }
//   return (
//     <>
//     <Message />
//     </>
//   )
// }