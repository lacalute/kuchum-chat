from config import *
from tokens import *

crud_users = CRUD(chat_users)

@app.get('/api/users', tags=['user'])
def all_users():
  return crud_users.get_all()

@app.get('/api/profile', tags=['user'])
def creditionals(req: Request, auth: AuthJWT = Depends()):
  TOKENS = token.tokens_required(req, 2, auth)
  return TOKENS['access']['user_id']



