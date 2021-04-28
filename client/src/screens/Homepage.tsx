import React, {useState, useEffect} from 'react';
import service from '../service';
import './styles/Homepage.css';
import timelineInterface from '../interfaces/timeline';

function Login() {
  const [userTimelines, setUserTimelines] = useState([{name:'',id:''}]);

  useEffect(()=>{
    service.getTimelines({user_id:1})
      .then(res=>setUserTimelines(res));
  },[]);

  const loadTimeline = (id:string) => {
    console.log(id);
  }

  return (
    <div className="HomeContainer">
      {userTimelines.map((timeline:timelineInterface)=><button onClick={()=>loadTimeline(timeline.id)}>{timeline.name}</button>)}
    </div>
  );
}

export default Login;