from appFile import request, app, ma
from models.user import db, User


class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'password', 'date_created')

user_schema = UserSchema()

@app.route('/user', methods=['POST','GET'])
def userQueries():

  name = request.json['name']
  password = request.json['password']

  new_user = User(name,password)

  db.session.add(new_user)
  db.session.commit()
  return user_schema.jsonify(new_user)

@app.route('/login', methods=['POST'])
def login():
  name = request.json['name']
  password = request.json['password']
  
  user = User.query.filter_by(name=name).first()

  if password == user.password:
    return user.name
  else:
    return 'denied'