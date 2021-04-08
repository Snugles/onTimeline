import psycopg2
import os
import controllers.users
from flask_marshmallow import Marshmallow
from models.user import db, User
from appFile import request, app 

config = open('config.txt','r')

uri = config.read()

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

config.close()

ma = Marshmallow(app)

class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'password', 'date_created')

user_schema = UserSchema()