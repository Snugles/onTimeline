from flask.json import jsonify
from flask import Flask, session
import jwt
import datetime
from appFile import request, app, ma, cross_origin
from models.index import db, User



class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'password', 'date_created')

user_schema = UserSchema()

@app.route('/user', methods=['POST','GET'])
@cross_origin()
def userQueries():

  name = request.json['name']
  password = request.json['password']

  new_user = User(name,password)

  db.session.add(new_user)
  db.session.commit()
  return user_schema.jsonify(new_user)

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  name = request.json['name']
  password = request.json['password']
  
  user = User.query.filter_by(name=name).first()
  

  if password == user.password:
    key = open('jwtKey.txt','r')
    session['logged_in'] = True
    token = jwt.encode({
      'user':name,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(30)
    },
    key.read())
    key.close()
    return jsonify({'token':token})
  else:
    return make_response('Denied', 403)