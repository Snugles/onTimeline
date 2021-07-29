import requests
import sys
sys.path.append("..")
import json

### login test ###
loginPayload={
  "name": "test_name",
  "password": "test_password"
  }

loginResp=requests.post("http://localhost:5000/login", json=loginPayload)
assert loginResp.status_code==200 and len(loginResp.cookies['token'])>0, 'its wrong'

jar = requests.cookies.RequestsCookieJar()
jar.set('token',loginResp.cookies['token'])

### timeline test ###
timelinePayload={
  "name": "test_name",
}

timelineResp=requests.post("http://localhost:5000/timeline", json=timelinePayload, cookies=jar)
assert timelineResp.status_code!=403, 'its wrong'
assert timelineResp.status_code==200, 'its wrong'
assert timelineResp.json()['name']=='test_name', 'its wrong'

### userTimeline test ###
userTimelineResp=requests.get("http://localhost:5000/userTimeline", cookies=jar)
assert userTimelineResp.status_code==200, 'its wrong'
assert {"id":timelineResp.json()['id'],"name":"test_name"} in userTimelineResp.json(), 'its wrong'

### addEvent test ###
addEventPayload={
  "info":"test_info",
  "name":"test_name",
  "timeline_id":timelineResp.json()['id'],
  "day":5,
  "month":8,
  "year":1965,
  "time":52
}

addEventResp=requests.post("http://localhost:5000/addEvent", json=addEventPayload, cookies=jar)
assert addEventResp.status_code==200, 'its wrong'
assert addEventResp.json()['name']=='test_name', 'its wrong'
assert addEventResp.json()['info']=='test_info', 'its wrong'
assert addEventResp.json()['timeline_id']==timelineResp.json()['id'], 'its wrong'
assert addEventResp.json()['day']==5, 'its wrong'
assert addEventResp.json()['month']==8, 'its wrong'
assert addEventResp.json()['year']==1965, 'its wrong'
assert addEventResp.json()['time']==52, 'its wrong'

### getEvents test ###
getEventsPayload={
  "timeline_id":timelineResp.json()['id'],
}

getEventsResp=requests.post("http://localhost:5000/getEvents", json=getEventsPayload, cookies=jar)
assert getEventsResp.status_code==200, 'its wrong'
assert {
  "info":"test_info",
  "name":"test_name",
  "id":getEventsResp.json()[0]['id'],
  "day":5,
  "month":8,
  "year":1965,
  "time":52
} in getEventsResp.json(), 'its wrong'

### eventEdit test ###
eventEditPayload={
  "info":"test_info",
  "name":"test_name",
  "id":getEventsResp.json()[0]['id'],
  "day":12,
  "month":2,
  "year":12,
  "time":69
}

eventEditResp=requests.patch("http://localhost:5000/eventEdit", json=eventEditPayload, cookies=jar)
assert eventEditResp.status_code==200, 'its wrong'
assert eventEditResp.json()['name']=='test_name', 'its wrong'
assert eventEditResp.json()['info']=='test_info', 'its wrong'
assert eventEditResp.json()['id']==getEventsResp.json()[0]['id'], 'its wrong'
assert eventEditResp.json()['day']==12, 'its wrong'
assert eventEditResp.json()['month']==2, 'its wrong'
assert eventEditResp.json()['year']==12, 'its wrong'
assert eventEditResp.json()['time']==69, 'its wrong'