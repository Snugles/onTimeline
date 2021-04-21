import LoginPayload from './interfaces/loginPayload';

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
      .then((results:any) =>results.json())
      .catch((e:string)=>console.error(e));
  },
};

export default apiRequests;