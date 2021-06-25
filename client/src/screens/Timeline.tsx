import React, {useState, useEffect} from 'react';
import service from '../service';
import Event from '../components/Event';
import './styles/Timeline.css';

function Timeline({match}:any) {
  const [events, setEvents] = useState([{name:'',id:'',info:'',day:0,month:0,year:0,time:0,screenpos:0}]);
  const [currentTLLength, setCurrentTLLength] = useState('Year');
  const [currentTLStart, setCurrentTLStart] = useState(0);
  const [newName, setNewName] = useState('');
  const [newInfo, setNewInfo] = useState('');
  const [newDay, setNewDay] = useState(0);
  const [newMonth, setNewMonth] = useState(0);
  const [newYear, setNewYear] = useState(0);
  const [newTime, setNewTime] = useState('');
  const [editName, setEditName] = useState('');
  const [editInfo, setEditInfo] = useState('');
  const [editDay, setEditDay] = useState(0);
  const [editMonth, setEditMonth] = useState(0);
  const [editYear, setEditYear] = useState(0);
  const [editTime, setEditTime] = useState(0);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [showEditEventForm, setShowEditEventForm] = useState(false);
  const [displayedEvent, setDisplayedEvent] = useState(['']);

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
    service.getEvents({timeline_id:match.params.id})
      .then(res=>{
        if (res.length) {
        let sortedEvents = res.sort((a:any,b:any)=>{
          if (a.year!==b.year) return a.year-b.year;
          if (a.month!==b.month) return a.month-b.month;
          if (a.day!==b.day) return a.day-b.day;
          return a.time-b.time;
        })
        setCurrentTLStart(sortedEvents[0].year);
        setEvents(sortedEvents);
      }else {setEvents([])}});
  },[match.params.id]);

  const handleNewEventSubmit = async (e:any) => {
    e.preventDefault();
    service.addEvent(
      {
        info:newInfo,
        name:newName,
        day:newDay,
        month:newMonth,
        year:newYear,
        time:parseInt(newTime),
        timeline_id:match.params.id})
      .then((event:any)=>setEvents([...events ,event]));
  }

  const handleEditEventSubmit = async (e:any) => {
    e.preventDefault();
    service.editEvent(
      {
        info:editInfo,
        name:editName,
        day:editDay,
        month:editMonth,
        year:editYear,
        time:editTime,
        id:parseInt(displayedEvent[2])})
      .then((event:any)=>{
        let newEvents = events;
        for (let element of newEvents) {
          if (element.id===event.id){
            element = event;
            setEvents(newEvents);
            break;
          }
        }
        });
  }

  const handleChangeNew = (e:any) => {
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

  const handleChangeEdit = (e:any) => {
    console.log(e.target.value)
    if (e.target.name==='name'){
      setEditName(e.target.value);
    } else if (e.target.name==='info'){
      setEditInfo(e.target.value);
    } else if (e.target.name==='day') {
      setEditDay(e.target.value);
    } else if (e.target.name==='month') {
      setEditMonth(e.target.value);
    } else if (e.target.name==='year') {
      setEditYear(e.target.value); 
    } else {
      setEditTime(e.target.value);
    }
  }

  const startTimeStampMaker = () => {
    if (currentTLLength==='Year') {
      if (currentTLStart>=0) {      
        return 'January '+currentTLStart+' AD';
      }
      return 'January '+-currentTLStart+' BC';
    }
    if (currentTLStart>=0) {      
      return currentTLStart+' AD';
    }
    return -currentTLStart+' BC';
  }

  const endTimeStampMaker = () => {
    if (currentTLLength==='Year') {
      if (currentTLStart>=0) {      
        return 'December '+currentTLStart+' AD';
      }
      return 'December '+-currentTLStart+' BC';
    }
    if (currentTLLength==='Decade') {
      if (currentTLStart+10>=0) {      
        return (currentTLStart+10)+' AD';
      }
      return -(currentTLStart+10)+' BC';
    }
    if (currentTLLength==='Century') {
      if (currentTLStart+100>=0) {      
        return (currentTLStart+100)+' AD';
      }
      return -(currentTLStart+100)+' BC';
    }
    if (currentTLStart+1000>=0) {      
      return (currentTLStart+1000)+' AD';
    }
    return -(currentTLStart+1000)+' BC';
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

  const displayEvent = (element:{name:string,info:string,id:string,day:number,month:number,year:number,time:number}) => {
    setDisplayedEvent([element.name,element.info,element.id])
    setEditName(element.name);
    setEditInfo(element.info);
    setEditDay(element.day);
    setEditMonth(element.month);
    setEditYear(element.year);
    setEditTime(element.time);
  }

  return (
    <div className='TimelineContainer'>
      <input value={currentTLStart} type='number' onChange={(e)=>{
        setCurrentTLStart(parseInt(e.target.value));
      }}></input>
      <button onClick={()=>setCurrentTLLength('Year')}>Year</button>
      <button onClick={()=>setCurrentTLLength('Decade')}>Decade</button>
      <button onClick={()=>setCurrentTLLength('Century')}>Century</button>
      <button onClick={()=>setCurrentTLLength('Millenium')}>Millenium</button>
      <div className='TimelineDateStamps'>
        <div>{startTimeStampMaker()}</div>
        <div>{endTimeStampMaker()}</div>
      </div>
      <div className='TimelineTimeline'/>
      <div className='TimelineDateStamps'>
        <button onClick={()=>decreaseTLPosition()}>-</button>
        <button onClick={()=>increaseTLPosition()}>+</button>
      </div>
      {output&&output.length?
        output.map((element)=>
          <div onClick={()=>displayEvent(element)}>
            <Event
              id={element.id}
              name={element.name}
              timelinePosition={element.screenpos}/>
          </div>)
        :<p>No events</p>}
        {displayedEvent.length===3?<div className='TimelineInfoDisplay'>
          <div style={{alignSelf:'flex-end'}} onClick={()=>setDisplayedEvent([])}>Close</div>
          <div style={{alignSelf:'flex-start'}}>{displayedEvent[0]}</div>
          {displayedEvent[1]}
          {showEditEventForm?
            <div className='TimelineFormContainer TimelineEdit'>
              <button onClick={()=>setShowEditEventForm(false)} style={{width:'100%'}}>Hide Event Editor</button>
              <form onSubmit = {handleEditEventSubmit} className='TimelineForm'>
                <label>Name:</label>
                <textarea value={editName} onChange={handleChangeEdit} name='name'></textarea>
                <label>Info:</label>
                <textarea value={editInfo} onChange={handleChangeEdit} name='info'></textarea>
                <label>Day:</label>
                <input value={editDay} onChange={handleChangeEdit} name='day'></input>
                <label>Month:</label>
                <input value={editMonth} onChange={handleChangeEdit} name='month'></input>
                <label>Year:</label>
                <input value={editYear} onChange={handleChangeEdit} name='year'></input>
                <label>Time:</label>
                <input value={editTime} onChange={handleChangeEdit} type='time'></input>
                <input type='submit' value='Create Topic'/>
              </form>
            </div>:
            <button onClick={()=>setShowEditEventForm(true)} className='TimelineFormContainer  TimelineEdit'>Edit Event</button>}
          </div>:<></>}
        {showNewEventForm?         
        <div className='TimelineFormContainer TimelineNew'>
          <button onClick={()=>setShowNewEventForm(false)} style={{width:'100%'}}>Hide Event Adder</button>
          <form onSubmit = {handleNewEventSubmit} className='TimelineForm'>
            <label>Name:</label>
            <textarea value={newName} onChange={handleChangeNew} name='name'></textarea>
            <label>Info:</label>
            <textarea value={newInfo} onChange={handleChangeNew} name='info'></textarea>
            <label>Day:</label>
            <input value={newDay} onChange={handleChangeNew} name='day'></input>
            <label>Month:</label>
            <input value={newMonth} onChange={handleChangeNew} name='month'></input>
            <label>Year:</label>
            <input value={newYear} onChange={handleChangeNew} name='year'></input>
            <label>Time:</label>
            <input value={newTime} onChange={handleChangeNew} type='time'></input>
            <input type='submit' value='Create Topic'/>
          </form>
        </div>:
        <button onClick={()=>setShowNewEventForm(true)} className='TimelineFormContainer  TimelineNew'>Add Event</button>}
    </div>
  );
}

export default Timeline;