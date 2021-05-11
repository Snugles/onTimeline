from appFile import request, app, ma, cross_origin
from models.index import db, Events
from flask import jsonify

class EventSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'info', 'timeline_id', 'timeline_date', 'date_created')

event_schema = EventSchema()

@app.route('/addEvent', methods=['POST'])
@cross_origin()
def addEvent():
  info = request.json['info']
  name = request.json['name']
  timeline_id = request.json['timeline_id']
  timeline_date = request.json['timeline_date']

  new_event = Events(name, info, timeline_id)

  db.session.add(new_event)
  db.session.commit()
  return event_schema.jsonify(new_event)

@app.route('/getEvents', methods=['POST'])
@cross_origin()
def getEvents():
  timelineID = request.json['timeline_id']

  events = Events.query.filter_by(timeline_id=timelineID).all()

  output = []
  for element in events:
    output.append({'name':element.name, 'id':element.id, 'info':element.info, 'timeline_date':element.timeline_date})

  return jsonify(output)

@app.route('/eventEdit', methods=['PATCH'])
@cross_origin()
def eventEditInfo():
  id = request.json['id']
  info = request.json['info']
  name = request.json['name']
  timeline_date = request.json['timeline_date']

  event = Events.query.filter_by(id=id).first()

  event.info = info
  event.name = name
  event.timeline_date = timeline_date
  db.session.commit()

  return jsonify({'name':event.name,'info':event.info, 'timeline_date':event.timeline_date})