import os
from flask import Flask
import psycopg2
import controllers.users
import controllers.timelines
import controllers.events
from flask_marshmallow import Marshmallow
from appFile import app

uri = open('sqlalchemyUri.txt','r')
key = open('jwtKey.txt','r')

app.config['SQLALCHEMY_DATABASE_URI'] = uri.read()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = key.read()
app.config['CORS_HEADERS'] = 'Content-Type'

uri.close()
key.close()

ma = Marshmallow(app)