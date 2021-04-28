import LoginPayload from './interfaces/loginPayload';
import timelinePayload from './interfaces/timelinePayload';

const apiRequests = { 
  login: (payload:LoginPayload) => {
    return fetch('http://localhost:5000/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  register: (payload:LoginPayload) => {
    return fetch('http://localhost:5000/user',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  createTimeline: (payload:timelinePayload) => {
    return fetch('http://localhost:5000/timeline',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
  getTimelines: (payload:{user_id:number}) => {
    return fetch('http://localhost:5000/userTimeline',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)})
        .then((results) =>results.json())
        .catch((e:string)=>console.error(e));
  },
};

export default apiRequests;