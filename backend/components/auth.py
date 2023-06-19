from config import *
from tokens import *

crud_security = CRUD(chat_users)
tokens_list = []

@app.post('/api/login', tags=['auth'])
def login(user: User, req: Request, res: Response, Authorize: AuthJWT = Depends()):
  token.tokens_required(req, 1, Authorize)
  user_db = chat_users.find_one({'nick': user.nick})

  if user_db and check_hashing(str(user.password).encode('utf-8'), user_db['password']):
    Authorize.set_access_cookies(token.create_access_token(user_db['_id']))
    Authorize.set_refresh_cookies(token.create_refresh_token())
    return {"msg": "Successfuly login"}

  elif not user_db:
    crud_security.create(user_payload(user.nick, user.password))
    user_db = chat_users.find_one({'nick': user.nick})
    Authorize.set_access_cookies(token.create_access_token(user_db['_id']))
    Authorize.set_refresh_cookies(token.create_refresh_token())
    return {"msg": "Successfuly register"}

  return {'msg': 'Creditionals are bad'}

@app.get('/api/logout', tags=['auth'])
async def logout (Authorize: AuthJWT = Depends()):
  Authorize.unset_jwt_cookies()
  return {"msg": "OK"}


 

