import sys
sys.path.append("..")
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from appFile import *

db = SQLAlchemy(app)

class Events(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  info = db.Column(db.String(511))
  timeline_id =  db.Column(db.Integer, db.ForeignKey('timeline.id'))
  date_created = db.Column(db.DateTime, default=datetime.now)
  
  def __init__(self, name, info, timeline_id):
    self.name = name
    self.info = info
    self.timeline_id = timeline_id

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  password = db.Column(db.String(50))
  date_created = db.Column(db.DateTime, default=datetime.now)
  
  def __init__(self, name, password):
    self.name = name
    self.password = password

class Timeline(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  user_id =  db.Column(db.Integer, db.ForeignKey('user.id'))
  date_created = db.Column(db.DateTime, default=datetime.now)

  def __init__(self, name, user_id):
    self.name = name
    self.user_id = user_id