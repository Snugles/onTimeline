from appFile import request, app, ma, cross_origin
from models.index import db, Events
from flask import jsonify
from controllers.auth import JWTcheck

class EventSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'info', 'timeline_id', 'day', 'month', 'year', 'time', 'date_created')

event_schema = EventSchema()

@app.route('/addEvent', methods=['POST'])
@cross_origin()
@JWTcheck
def addEvent():
  info = request.json['info']
  name = request.json['name']
  timeline_id = request.json['timeline_id']
  day = request.json['day']
  month = request.json['month']
  year = request.json['year']
  time = request.json['time']

  new_event = Events(name, info, timeline_id, day, month, year, time)

  db.session.add(new_event)
  db.session.commit()
  return event_schema.jsonify(new_event)

@app.route('/getEvents', methods=['POST'])
@cross_origin()
@JWTcheck
def getEvents():
  timelineID = request.json['timeline_id']

  events = Events.query.filter_by(timeline_id=timelineID).all()

  output = []
  for element in events:
    output.append({'name':element.name, 'id':element.id, 'info':element.info, 'day':element.day, 'month':element.month, 'year':element.year, 'time':element.time})

  return jsonify(output)

@app.route('/eventEdit', methods=['PATCH'])
@cross_origin()
@JWTcheck
def eventEditInfo():
  id = request.json['id']
  info = request.json['info']
  name = request.json['name']
  day = request.json['day']
  month = request.json['month']
  year = request.json['year']
  time = request.json['time']

  event = Events.query.filter_by(id=id).first()

  event.info = info
  event.name = name
  event.day = day
  event.month = month
  event.year = year
  event.time = time
  db.session.commit()

  return jsonify({'name':event.name,'info':event.info, 'day':event.day, 'month':event.month, 'year':event.year, 'time':event.time})