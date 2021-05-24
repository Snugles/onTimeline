import React, {useState, useEffect} from 'react';
import service from '../service';
import Event from '../components/Event';
import './styles/Timeline.css';

function Timeline() {
  const [events, setEvents] = useState([{name:'',id:'',info:'',day:0,month:0,year:0,time:0, screenpos:0}]);
  const [currentTLLength, setCurrentTLLength] = useState('Year');
  const [currentTLStart, setCurrentTLStart] = useState(0);
  const [currentTLEvents, setCurrentTLEvents] = useState([{name:'',id:'',info:'',day:0,month:0,year:0,time:0, screenpos:0}])
  
  const positionEvents = (sortedEvents:any[],TLStart:number=currentTLStart) => {
    const output:any[] = [];
    console.log(currentTLLength)
    if (currentTLLength==='Year') {
      for (const event of sortedEvents) {
        if (event.year === TLStart) {
          event.screenpos = (event.month+event.day/30)/12*100;
          output.push(event);
        }
      }
    } else if (currentTLLength==='Decade') {
      for (const event of sortedEvents) {
        if (event.year<=TLStart && event.year>TLStart-10) {
          event.screenpos = (event.year-TLStart+event.month/12)/10*100;
          output.push(event);
        }
      }
    } else if (currentTLLength==='Century') {
      for (const event of sortedEvents) {
        if (event.year <= TLStart&&event.year>TLStart-100) {
          event.screenpos = (event.year-TLStart)/100*100;
          output.push(event);
        }
      }
    } else {
      for (const event of sortedEvents) {
        if (event.year<=TLStart && event.year>TLStart-1000) {
          event.screenpos = (event.year-TLStart)/1000*100;
          output.push(event);
        }
      }
    }
    
    return sortedEvents;
  }

  useEffect(()=>{
    setCurrentTLEvents(positionEvents(events));
  },[currentTLLength]);

  useEffect(()=>{
    service.getEvents({timeline_id:1})
      .then(res=>{
        let sortedEvents = res.sort((a:any,b:any)=>{
          if (a.year!==b.year) return a.year-b.year;
          if (a.month!==b.month) return a.month-b.month;
          if (a.day!==b.day) return a.day-b.day;
          return a.time-b.time;
        })
        setCurrentTLStart(sortedEvents[0].year);
        setEvents(sortedEvents);
        setCurrentTLEvents(positionEvents(sortedEvents,sortedEvents[0].year));
      });
  },[]);

  return (
    <div className="TimelineContainer">
      <div className="TimelineTimeline"/>
      {currentTLEvents&&currentTLEvents.length?
        currentTLEvents.map(element=>
          <div style={{left: element.screenpos+'%'}}>
            <Event
              id={element.id}
              info={element.info}
              name={element.name}
              timeline_date={element.day}
              timelinePosition={element.screenpos}/>
            </div>)
        :<p>No events</p>}
      <button onClick={()=>setCurrentTLLength('Year')}>Year</button>
      <button onClick={()=>{
          setCurrentTLEvents(positionEvents(events));
          setTimeout(()=>setCurrentTLLength('Decade'),0)
        }}>Decade</button>
      <button onClick={()=>setCurrentTLLength('Century')}>Century</button>
      <button onClick={()=>setCurrentTLLength('Millenium')}>Millenium</button>
    </div>
  );
}

export default Timeline;