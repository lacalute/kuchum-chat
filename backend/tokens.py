from config import *
import time
import jwt
from jwt.exceptions import ExpiredSignatureError

# JWT token config
ACCESS_TOKEN_EXPIRE_DELTA = 900.0
REFRESH_TOKEN_EXPIRE_DELTA = 2592000.0
SECRET_KEY = 'secret'
ALGORITHM = 'HS256'

class Token():
  def token_required(self, res, req, option: Optional[int]):
    """
    option - 1 if login or registration
    """
    access_token = req.cookies.get('access_token_cookie')
    print(access_token)
    if not access_token and option != 1:
      raise AccessTokenRequired(status_code=422,message="There are no tokens in cookies")
    return self.tokenAccess(access_token, res)
  # return access_token
  def create_access_token(self, user_id):
    access_token = jwt.encode({
      'user_id': str(user_id),
      'exp': time.time() + ACCESS_TOKEN_EXPIRE_DELTA
    }, SECRET_KEY, algorithm=ALGORITHM)
    return access_token
  
  # return refresh_token
  def create_refresh_token(self):
    refresh_token = jwt.encode({
      'exp': time.time() + REFRESH_TOKEN_EXPIRE_DELTA
    }, SECRET_KEY, algorithm=ALGORITHM)
    return refresh_token
  
    
  def tokenAccess(self, access_token, res: Response):
    if access_token:
      try:
        return jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
      except ExpiredSignatureError:
        tokenSplit = access_token.split(".")
        payload = json.loads((base64.b64decode(str(tokenSplit[1]) + "==")).decode("utf-8"))
        new_accesss_token = self.create_access_token(payload['user_id'])
        res.set_cookie(key='access_token_cookie', value=new_accesss_token, samesite="none", secure=True)
        return jwt.decode(new_accesss_token, SECRET_KEY, algorithms=ALGORITHM)
 
token = Token()