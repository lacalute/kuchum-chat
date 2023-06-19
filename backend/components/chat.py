from config import *
from tokens import *
crud_chat = CRUD(chat_relate)
crud_users = CRUD(chat_users)

@app.post('/api/chat', tags=['chat'])
def create_chat(user_id, req: Request, res: Response):
  TOKEN = token.token_required(res, req, 2)

  try:
    crud_chat.create(chat_scheme(crud_users.get_id(TOKEN['user_id'])['nick'], TOKEN['user_id'], crud_users.get_id(user_id)['nick'], user_id))
    return {'msg': 'success to create chat'}
  except:
    return {'msg': 'faile to create chat'}

@app.delete('/api/chat', tags=['chat'])
def delete_chat(chat_id, req: Request, res: Response):
  TOKEN = token.token_required(res, req, 2)
  try:
    crud_chat.delete(chat_id)
    return {'msg': 'Chat was deleted'}
  except:
    return {'msg': 'Failed'}
  
@app.get('/api/chat', tags=['chat'])
def your_chats(req: Request, res: Response):
  TOKENS = token.token_required(res, req, 2)
  result = []
  for find_chat in chat_relate.find():
    find_chat['_id'] = str(find_chat['_id'])
    for n in find_chat['relate']:
      if n[1] == TOKENS['user_id']:
        result.append(find_chat)


  return result


@app.get('/api/chatId/{chat_id}', tags=['chat'])
def chatId(chat_id):
  return crud_chat.get_id(chat_id)
