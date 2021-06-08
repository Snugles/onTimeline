from appFile import request, app, ma, cross_origin
from models.index import db, Timeline
from flask import jsonify
from controllers.auth import JWTcheck

class TimelineSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'user_id', 'date_created')

timeline_schema = TimelineSchema()

@app.route('/timeline', methods=['POST'])
@cross_origin()
@JWTcheck
def create(data):
  user_id = request.json['user_id']
  name =request.json['name']

  new_timeline = Timeline(name,user_id)

  db.session.add(new_timeline)
  db.session.commit()
  return timeline_schema.jsonify(new_timeline)

@app.route('/userTimeline', methods=['GET'])
@cross_origin()
@JWTcheck
def get(data):
  timeline = Timeline.query.filter_by(user_id=data['user']).all()

  output = []
  for element in timeline:
    output.append({'name':element.name, 'id':element.id})

  return jsonify(output)