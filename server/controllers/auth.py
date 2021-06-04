import jwt
from flask import Flask, jsonify, session
from functools import wraps
from appFile import request, app

def JWTcheck(function):
  @wraps(function)
  def decorated(*args, **kwargs):
    token = request.headers.get('Authorization')
    if not token:
      return 'msg:authentication denied', 403
    try:
      data = jwt.decode(token, app.config['SECRET_KEY'])
    except jwt.InvalidTokenError:
      return 'Invalid token. Please log in again.'
    except jwt.ExpiredSignatureError:
      return 'Signature expired. Please log in again.'
    return function(*args,**kwargs)

  return decorated