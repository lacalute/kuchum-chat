from config import *
from tokens import *
crud_chat = CRUD(chat_relate)

@app.post('/api/chat', tags=['chat'])
def create_chat(user_id, req: Request, auth: AuthJWT = Depends()):
  TOKEN = token.tokens_required(req, 2, auth)
  try:
    crud_chat.create(chat_scheme(TOKEN['access']['user_id'], user_id))
    return {'msg': 'success to create chat'}
  except:
    return {'msg': 'faile to create chat'}

@app.delete('/api/chat', tags=['chat'])
def delete_chat(chat_id):
  try:
    crud_chat.delete(chat_id)
    return {'msg': 'Chat was deleted'}
  except:
    return {'msg': 'Failed'}
  
@app.get('/api/chat', tags=['chat'])
def your_chats(req: Request, auth: AuthJWT = Depends()):
  TOKENS = token.tokens_required(req, 2, auth)
  result = []
  for find_chat in chat_relate.find():
    find_chat['_id'] = str(find_chat['_id'])
    for n in find_chat['relate']:
      if n == TOKENS['access']['user_id']:
        result.append(find_chat)
  return result
