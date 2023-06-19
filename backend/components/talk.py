from config import *
from tokens import *

crud_chat = CRUD(chat_relate)

@app.post('/api/message', tags=['message'])
def create_message(msg: Message, chat_id, res: Response, req: Request):
  TOKEN = token.token_required(res, req, 2)
  chat_history = crud_chat.get_id(chat_id)['history']
  chat_history.append(message_scheme(TOKEN['user_id'], msg.message))
  crud_chat.update(chat_id, {'history': chat_history})
  return {'msg': 'Message sent'}


@app.delete('/api/message', tags=['message'])
def delete_message():
  pass
