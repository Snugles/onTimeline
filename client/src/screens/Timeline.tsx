import React, {useState, useEffect} from 'react';
import service from '../service';
import Event from '../components/Event';
import './styles/Timeline.css';

function Timeline() {
  const [events, setEvents] = useState([{name:'',id:'',info:'',timeline_date:0, screenpos:0}]);
  const [dateStamps, setDateStamps] = useState([new Date()]);
  
  const positionEvents = (sortedEvents:any[]) => {
    const dateDifference:number = sortedEvents[sortedEvents.length-1].timeline_date - sortedEvents[0].timeline_date;

    for (const event of sortedEvents) {
      event.screenpos = 95/dateDifference*(event.timeline_date-sortedEvents[0].timeline_date);
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
        const dateDifference:number = sortedEvents[sortedEvents.length-1].timeline_date - sortedEvents[0].timeline_date;
        const output=[];
        for (let i=0;i<=10;i++) {
          output.push(new Date(Math.floor(sortedEvents[0].timeline_date+i/10*(dateDifference))))
        }
        setDateStamps(output);
      });
  },[]);

  return (
    <div className="TimelineContainer">
      <div className="TimelineDateStamps">
        {dateStamps?dateStamps.map(date=><p>{date.getHours().toString()+':'+date.getMinutes().toString()+':'+date.getMilliseconds().toString()}</p>):<div>Loading</div>}
      </div>
      <div className="TimelineTimeline"/>
      {events&&events.length?
        events.map(element=>
          <Event
            id={element.id}
            info={element.info}
            name={element.name}
            timeline_date={element.timeline_date}
            timelinePosition={element.screenpos}/>)
        :<p>No events</p>}
      <button onClick={()=>setEvents(positionEvents(events))}>click me</button>
    </div>
  );
}

export default Timeline;