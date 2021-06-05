import LoginPayload from './interfaces/loginPayload';
import timelinePayload from './interfaces/timelinePayload';
import eventSubmissionTypes from './interfaces/eventSubmissionTypes';

const apiRequests = { 
  login: (payload:LoginPayload) => {
    return fetch('/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  register: (payload:LoginPayload) => {
    return fetch('/user',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  createTimeline: (payload:timelinePayload) => {
    return fetch('/timeline',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  getTimelines: (payload:{user_id:number}) => {
    return fetch('/userTimeline',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  getEvents: (payload:{timeline_id:number}) => {
    return fetch('/getEvents',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  addEvent: (payload:eventSubmissionTypes) => {
    return fetch('/addEvent',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  }
};

export default apiRequests;