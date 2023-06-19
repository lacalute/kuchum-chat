from fastapi import FastAPI, Depends, Request, Response, Cookie
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi_jwt_auth.exceptions import (
    InvalidHeaderError,
    CSRFError,
    JWTDecodeError,
    RevokedTokenError,
    MissingTokenError,
    AccessTokenRequired,
    RefreshTokenRequired,
    FreshTokenRequired
)
from pydantic import BaseModel
from connection import *
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from hashing import *
from bson.objectid import ObjectId
from typing import Optional
import base64
import json
import jwt



origins = [
  "https://kuch-chat.vercel.app/",
]

middleware = [
  Middleware(CORSMiddleware, allow_origins=origins)
]

app = FastAPI(middleware=middleware)
@app.middleware("https")
async def add_cors_header(request: Request, call_next):
    response = await call_next(request)
    print('==========before====>headers', response.headers)
    headers = {'Access-Control-Allow-Origin': 'https://kuch-chat.vercel.app/',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'}
    response.headers.update(headers)
    print('==========after====>headers', response.headers)
    return response


class CRUD:
  def __init__(self, collection):
    self.collection = collection
    
  def create(self, scheme): 
    try:
      self.collection.insert_one(scheme)
      return True
    except:
      return False

  def delete(self, id):
    try:
      self.collection.delete_one({'_id': ObjectId(id)})
      return True
    except:
      return False

  def update(self, id, value):
    try:
      self.collection.update_one({'_id': ObjectId(id)}, {"$set": value}, upsert=False)
      return True
    except:
      return False
    
  def get_all(self):
    try:
      all = []
      for item in self.collection.find():
        item['_id'] = str(item['_id'])
        all.append(item)
      return all
    except:
      return None
    
  def get_id(self, id):
    try: 
      result_id = self.collection.find_one({'_id': ObjectId(id)})
      result_id['_id'] = str(result_id['_id'])
      return result_id
    except: 
      return {'msg': 'Not found'}
    

class User(BaseModel):
  nick: str
  password: str

class Message(BaseModel):
  message: str

def user_payload(nick, password):
  user_payload = {
    'nick': nick,
    'password': hashing(password)
  }
  return user_payload


def chat_scheme(nick, id1, nick2, id2):
  chat_scheme = {
    'relate': [
      [nick, id1],
      [nick2, id2]
    ],
    'history': []
  }
  return chat_scheme


def message_scheme(user_id, nick, message):
  message_scheme = {
    'user': [user_id, nick],
    'message': message
  }
  return message_scheme

# AuthJWT class settings
class Settings(BaseModel):
  authjwt_secret_key: str = "secret"
  authjwt_token_location: set = {"cookies"}
  authjwt_cookie_csrf_protect: bool = False

@AuthJWT.load_config
def get_config():
    return Settings()

# error handler
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
