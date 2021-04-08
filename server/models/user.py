import sys
sys.path.append("..")
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from appFile import *

db = SQLAlchemy(app)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  password = db.Column(db.String(50))
  date_created = db.Column(db.DateTime, default=datetime.now)
  
  def __init__(self, name, password):
    self.name = name
    self.password = password