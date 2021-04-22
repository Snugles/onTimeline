import psycopg2
import os
import controllers.users
import controllers.timelines
from flask_marshmallow import Marshmallow
from appFile import request, app

config = open('config.txt','r')

uri = config.read()

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

config.close()

ma = Marshmallow(app)