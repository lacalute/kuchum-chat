from config import *
from tokens import *

crud_chat = CRUD(chat_relate)

@app.post('/api/message', tags=['message'])
def create_message(msg: Message, chat_id, req: Request, auth: AuthJWT = Depends()):
  TOKEN = token.tokens_required(req, 2, auth)
  chat_history = crud_chat.get_id(chat_id)['history']
  chat_history.append(message_scheme(TOKEN['access']['user_id'], msg.message))
  crud_chat.update(chat_id, {'history': chat_history})
  return {'msg': 'Message sent'}


@app.delete('/api/message', tags=['message'])
def delete_message():
  pass
