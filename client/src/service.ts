import LoginPayload from './interfaces/loginPayload';
import newEventSubmissionTypes from './interfaces/newEventSubmissionTypes';
import editEventSubmissionTypes from './interfaces/editEventSubmissionTypes'

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
  createTimeline: (name:string) => {
    return fetch('/timeline',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name:name})})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  getTimelines: () => {
    return fetch('/userTimeline',{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }})
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
  addEvent: (payload:newEventSubmissionTypes) => {
    return fetch('/addEvent',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  editEvent: (payload:editEventSubmissionTypes) => {
    return fetch('/eventEdit',{
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  }
};

export default apiRequests;