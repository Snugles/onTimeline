from appFile import request, app, ma, cross_origin
from models.index import db, Timeline

class TimelineSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'user_id', 'date_created')

timeline_schema = TimelineSchema()

@app.route('/timeline', methods=['POST','GET'])
@cross_origin()
def timeline():
  if request.method == 'POST':
    user_id = request.json['user_id']
    name =request.json['name']

    new_timeline = Timeline(name,user_id)

    db.session.add(new_timeline)
    db.session.commit()
    return timeline_schema.jsonify(new_timeline)
  else:
    user_id = request.json['user_id']

    timeline = User.query.filter_by(user_id=user_id).all()

    return timeline_schema.jsonify(timeline)