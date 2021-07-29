from flask.json import jsonify
from flask import Flask, session, make_response
import jwt
import datetime
from appFile import request, app, ma, cross_origin
from models.index import db, User
from cryptography.fernet import Fernet

class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'password', 'date_created')

user_schema = UserSchema()

@app.route('/user', methods=['POST'])
@cross_origin()
def userQueries():
  name = request.json['name']
  password = request.json['password']

  keyFile = open('dbPassKey.txt','r')
  key = keyFile.read()
  keyFile.close()
  cipher_suite = Fernet(key)
  
  new_user = User(name,cipher_suite.encrypt(password.encode('utf-8')).decode("utf-8"))

  db.session.add(new_user)
  db.session.commit()
  return jsonify({'name':new_user.name})

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  name = request.json['name']
  password = request.json['password']

  keyFile = open('dbPassKey.txt','r')
  key = keyFile.read()
  cipher_suite = Fernet(key)

  
  user = User.query.filter_by(name=name).first()

  unciphered_text = cipher_suite.decrypt(user.password.encode('utf-8')).decode("utf-8")

  if password == unciphered_text:
    key = open('jwtKey.txt','r')
    session['logged_in'] = True
    token = jwt.encode({
      'user':user.id,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(30)
    },
    key.read())
    key.close()
    response = make_response(jsonify(msg='Successful login'), 200)
    response.set_cookie('token', token)
    return response
  else:
    return jsonify(msg='Denied'), 403