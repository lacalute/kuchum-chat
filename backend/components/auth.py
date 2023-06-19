from config import *
from tokens import *

crud_security = CRUD(chat_users)
tokens_list = []

@app.post('/api/login', tags=['auth'])
def login(user: User, req: Request, res: Response):
  token.token_required(res, req, 1)
  user_db = chat_users.find_one({'nick': user.nick})

  if user_db and check_hashing(str(user.password), user_db['password']):
    res.set_cookie(key='access_token_cookie', value=token.create_access_token(user_db['_id']), samesite="none", secure=True, max_age=120, expires=120)
    return {"msg": "Successfuly login"}

  elif not user_db:
    crud_security.create(user_payload(user.nick, user.password))
    user_db = chat_users.find_one({'nick': user.nick})
    res.set_cookie(key='access_token_cookie', value=token.create_access_token(user_db['_id']), samesite="none", secure=True, max_age=120, expires=120)
    return {"msg": "Successfuly register"}

  return {'msg': 'Creditionals are bad'}

@app.get('/api/logout', tags=['auth'])
async def logout (res: Response):
  res.set_cookie(key='access_token_cookie', value="", expires=0, max_age=0, secure=True, samesite='none')
  return {"msg": "OK"}


 

