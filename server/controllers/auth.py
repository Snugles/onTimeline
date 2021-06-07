import jwt
from flask import Flask, jsonify, session
from functools import wraps
from appFile import request, app

def JWTcheck(function):
  @wraps(function)
  def decorated(*args, **kwargs):
    token = request.cookies.get('token')
    if not token:
      return 'msg:authentication denied', 403
    try:
      data = jwt.decode(token, app.config['SECRET_KEY'])
    except jwt.InvalidTokenError:
      return jsonify(message='Invalid token. Please log in again.')
    except jwt.ExpiredSignatureError:
      return jsonify(message='Signature expired. Please log in again.')
    return function(data,*args,**kwargs)

  return decorated