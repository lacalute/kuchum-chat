from config import *
from tokens import *

crud_security = CRUD(chat_users)


@app.post('/api/login', tags=['auth'])
def login(user: User, req: Request, Authorize: AuthJWT = Depends()):
  token.tokens_required(req, 1, Authorize)
  user_db = chat_users.find_one({'nick': user.nick})

  if user_db and check_hashing(user.password, user_db['password']):
    Authorize.set_access_cookies(token.create_access_token(user_db['_id']))
    Authorize.set_refresh_cookies(token.create_refresh_token())
    print('in')
    return {"msg":"Successfully login"}
  elif not user_db:
    user_db = user_payload(user.nick, user.password)
    crud_security.create(user_db)
    Authorize.set_access_cookies(token.create_access_token(user_db['_id']))
    Authorize.set_refresh_cookies(token.create_refresh_token())
    return {'msg': 'user is created'}

  return {'msg': 'Creditionals are bad'}

@app.get('/api/logout', tags=['auth'])
async def logout (Authorize: AuthJWT = Depends()):
  Authorize.unset_jwt_cookies()
  return {"msg": "OK"}


 

