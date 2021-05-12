import React, {useState, useEffect} from 'react';
import service from '../service';
import Event from '../components/Event';
import './styles/Timeline.css';

function Timeline() {
  const [events, setEvents] = useState([{name:'',id:'',info:'',timeline_date:0, screenpos:0}]);
  
  const positionEvents = (sortedEvents:any[]) => {
    let timelineLength:number;
    const dateDifference:number = sortedEvents[sortedEvents.length-1].timeline_date - sortedEvents[0].timeline_date;

    if (window.innerWidth<500) timelineLength=500;
    else timelineLength = window.innerWidth;

    for (const event of sortedEvents) {
      event.screenpos = timelineLength/dateDifference*(event.timeline_date-sortedEvents[0].timeline_date);
    }
    return sortedEvents;
  }

  useEffect(()=>{
    service.getEvents({timeline_id:1})
      .then(res=>{
        let sortedEvents = res.sort((a:any,b:any)=>{
          return a.timeline_date - b.timeline_date;
        })
        setEvents(positionEvents(sortedEvents));
      });
  },[]);


  return (
    <div className="TimelineContainer">
      {events&&events.length?
        events.map(element=>
          <Event
            id={element.id}
            info={element.info}
            name={element.name}
            timeline_date={element.timeline_date}
            timelinePosition={element.screenpos}/>)
        :<p>No events</p>}
      <div className="TimelineTimeline"/>
    </div>
  );
}

export default Timeline;