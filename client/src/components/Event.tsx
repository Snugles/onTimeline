import React, {useState} from 'react';
import eventTypes from '../interfaces/eventTypes';
import './styles/Event.css';

const Event: React.FC<eventTypes> = ({id, timelinePosition, name, info}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{left: timelinePosition+'%'}} className="EventContainer">
      <div
        className="EventName"
        key={id}
        onMouseEnter={()=>setShowPreview(true)}
        onMouseLeave={()=>setShowPreview(false)}
      >
        {name}
      </div>
        {showPreview?<div className="EventPreview">{info}</div>:<></>}
    </div>
  );
}

export default Event;