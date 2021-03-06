from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

config = open('sqlalchemyUri.txt','r')

uri = config.read()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

config.close()

migrate = Migrate(app,db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  password = db.Column(db.String(256))
  date_created = db.Column(db.DateTime, default=datetime.now)

class Timeline(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  user_id =  db.Column(db.Integer, db.ForeignKey('user.id'))
  date_created = db.Column(db.DateTime, default=datetime.now)

class Events(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  info = db.Column(db.String(511))
  timeline_id =  db.Column(db.Integer, db.ForeignKey('timeline.id'))
  day = db.Column(db.Integer)
  month = db.Column(db.Integer)
  year = db.Column(db.Integer)
  time = db.Column(db.Integer)
  date_created = db.Column(db.DateTime, default=datetime.now)

if __name__ == '__main__':
  manager.run()