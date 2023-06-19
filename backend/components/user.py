from config import *
from tokens import *


crud_users = CRUD(chat_users)

@app.get('/api/users', tags=['user'])
def all_users():
  return crud_users.get_all()

@app.get('/api/profile', tags=['user'])
def profile(req: Request, res: Response):
  tok = req.cookies.get('access_token_cookie') 
  return tok

