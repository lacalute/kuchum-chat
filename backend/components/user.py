from config import *
from tokens import *


crud_users = CRUD(chat_users)

@app.get('/api/users', tags=['user'])
def all_users():
  return crud_users.get_all()

@app.post('/api/profile', tags=['user'])
def profile(req: Request, res: Response): 
  TOKENS = token.token_required(res, req, 2)
  return TOKENS

