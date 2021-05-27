import React, {useState, useEffect} from 'react';
import service from '../service';
import Event from '../components/Event';
import './styles/Timeline.css';

function Timeline() {
  const [events, setEvents] = useState([{name:'',id:'',info:'',day:0,month:0,year:0,time:0, screenpos:0}]);
  const [currentTLLength, setCurrentTLLength] = useState('Year');
  const [currentTLStart, setCurrentTLStart] = useState(0);
  const [newName, setNewName] = useState('');
  const [newInfo, setNewInfo] = useState('');
  const [newDay, setNewDay] = useState(0);
  const [newMonth, setNewMonth] = useState(0);
  const [newYear, setNewYear] = useState(0);
  const [newTime, setNewTime] = useState('');
  
  let output:any[]=[];
  const positionEvents = (sortedEvents:any[],TLStart:number=currentTLStart) => {
    const output:any[] = [];
    if (currentTLLength==='Year') {
      for (const event of sortedEvents) {
        if (event.year === TLStart) {
          event.screenpos = (event.month+event.day/30)/12*100;
          output.push(event);
        }
      }
    } else if (currentTLLength==='Decade') {
      for (const event of sortedEvents) {
        if (event.year>=TLStart && event.year-10<TLStart) {
          event.screenpos = (event.year-TLStart+event.month/12)/10*100;
          output.push(event);
        }
      }
    } else if (currentTLLength==='Century') {
      for (const event of sortedEvents) {
        if (event.year>=TLStart&&event.year-100<TLStart) {
          event.screenpos = (event.year-TLStart)/100*100;
          output.push(event);
        }
      }
    } else {
      for (const event of sortedEvents) {
        if (event.year>=TLStart && event.year-1000<TLStart) {
          event.screenpos = (event.year-TLStart)/1000*100;
          output.push(event);
        }
      }
    }
    
    return output;
  }

  if (events&&events.length) {
    output = positionEvents(events);
  }


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
      });
  },[]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    service.addEvent(
      {
        info:newInfo,
        name:newName,
        day:newDay,
        month:newMonth,
        year:newYear,
        time:parseInt(newTime),
        timeline_id:1})
      .then((event:any)=>setEvents([...events ,event]));
  }

  const handleChange = (e:any) => {
    if (e.target.name==='name'){
      setNewName(e.target.value);
    } else if (e.target.name==='info'){
      setNewInfo(e.target.value);
    } else if (e.target.name==='day') {
      setNewDay(e.target.value);
    } else if (e.target.name==='month') {
      setNewMonth(e.target.value);
    } else if (e.target.name==='year') {
      setNewYear(e.target.value); 
    } else {
      setNewTime(e.target.value);
    }
  }

  const startTimeStampMaker = () => {
    if (currentTLLength==='Year') return 'January '+currentTLStart;
    return currentTLStart;
  }

  const endTimeStampMaker = () => {
    if (currentTLLength==='Year') return 'December '+currentTLStart;
    if (currentTLLength==='Decade') return currentTLStart+10;
    if (currentTLLength==='Century') return currentTLStart+100;
    return currentTLStart+1000;
  }

  const increaseTLPosition = () => {
    if (currentTLLength==='Year') return setCurrentTLStart(currentTLStart+1);
    if (currentTLLength==='Decade') return setCurrentTLStart(currentTLStart+10);
    if (currentTLLength==='Century') return setCurrentTLStart(currentTLStart+100);
    setCurrentTLStart(currentTLStart+1000);
  }

  const decreaseTLPosition = () => {
    if (currentTLLength==='Year') return setCurrentTLStart(currentTLStart-1);
    if (currentTLLength==='Decade') return setCurrentTLStart(currentTLStart-10);
    if (currentTLLength==='Century') return setCurrentTLStart(currentTLStart-100);
    setCurrentTLStart(currentTLStart-1000);
  }

  return (
    <div className="TimelineContainer">
      <div className="TimelineDateStamps">
        <div>{startTimeStampMaker()}</div>
        <div>{endTimeStampMaker()}</div>
      </div>
      <div className="TimelineTimeline"/>
      <div className="TimelineDateStamps">
        <button onClick={()=>decreaseTLPosition()}>-</button>
        <button onClick={()=>increaseTLPosition()}>+</button>
      </div>
      {output&&output.length?
        output.map(element=>
          <div style={{left: element.screenpos+'%'}}>
            <Event
              id={element.id}
              info={element.info}
              name={element.name}
              day={element.day}
              month={element.month}
              year={element.year}
              time={element.time}
              timelinePosition={element.screenpos}/>
            </div>)
        :<p>No events</p>}
      <button onClick={()=>setCurrentTLLength('Year')}>Year</button>
      <button onClick={()=>setCurrentTLLength('Decade')}>Decade</button>
      <button onClick={()=>setCurrentTLLength('Century')}>Century</button>
      <button onClick={()=>setCurrentTLLength('Millenium')}>Millenium</button>
      <form onSubmit = {handleSubmit} className='homeForm'>
        <label>Name:</label>
        <textarea value={newName} onChange={handleChange} name='name'></textarea>
        <label>Info:</label>
        <textarea value={newInfo} onChange={handleChange} name='info'></textarea>
        <label>Day:</label>
        <input value={newDay} onChange={handleChange} name='day'></input>
        <label>Month:</label>
        <input value={newMonth} onChange={handleChange} name='month'></input>
        <label>Year:</label>
        <input value={newYear} onChange={handleChange} name='year'></input>
        <label>Time:</label>
        <input value={newTime} onChange={handleChange} type='time'></input>
        <input type="submit" value="Create Topic"/>
      </form>
    </div>
  );
}

export default Timeline;