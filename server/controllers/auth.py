import jwt
from flask import Flask, jsonify, session
from functools import wraps
from appFile import request, app

def JWTcheck(function):
  @wraps(function)
  def decorated(*args, **kwargs):
    token = request.cookies.get('token')
    if not token:
      return jsonify(message='No session. Please login'), 403
    try:
      data = jwt.decode(token, app.config['SECRET_KEY'])
    except jwt.InvalidTokenError:
      return jsonify(message='Invalid token. Please log in again.'), 403
    except jwt.ExpiredSignatureError:
      return jsonify(message='Signature expired. Please log in again.'), 403
    return function(data,*args,**kwargs)

  return decorated