import os
from functools import wraps
from flask import Flask, jsonify, session
import jwt
import psycopg2
import controllers.users
import controllers.timelines
import controllers.events
from flask_marshmallow import Marshmallow
from appFile import request, app

uri = open('sqlalchemyUri.txt','r')
key = open('jwtKey.txt','r')

app.config['SQLALCHEMY_DATABASE_URI'] = uri.read()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = key.read()
app.config['CORS_HEADERS'] = 'Content-Type'

def JWTcheck(function):
  @wraps(function)
  def decorated(*args, **kwargs):
    token = request.args.get('token')
    if not token:
      return jsonify({'msg:authentication denied'}), 403
    try:
      data = jwt.decode(token, key.read())
    except:
      return jsonify({'msg:invalid token'}), 403
    return function(*args,**kwargs)

  return decorated

uri.close()
key.close()

ma = Marshmallow(app)