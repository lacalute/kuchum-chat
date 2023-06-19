from config import *
from tokens import *


crud_users = CRUD(chat_users)

@app.get('/api/users', tags=['user'])
def all_users():
  return crud_users.get_all()

@app.post('/api/profile', tags=['user'])
def profile(user: User): 
  try:
    user_db = chat_users.find_one({'nick': user.nick})
    if user_db and check_hashing(user.password, user_db['password']):
      return str(user_db['_id'])
  except: 
    return 'User not found'

