import React, {useState, useEffect} from 'react';
import service from '../service';
import './styles/Timeline.css';

function Timeline() {
  const [events, setEvents] = useState([{name:'',id:'',info:''}])

  useEffect(()=>{
    service.getEvents({timeline_id:1})
      .then(res=>setEvents(res));
  },[]);

  return (
    <div className="TimelineContainer">
      {events&&events.length?events.map(element=>
      <div key={element.id}>
        <div>
          {element.info}
        </div>
        <div>
          {element.name}
        </div>
      </div>)
      :<p>No events</p>}
    </div>
  );
}

export default Timeline;