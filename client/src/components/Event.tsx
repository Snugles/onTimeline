import React from 'react';
import eventTypes from '../interfaces/eventTypes';
import './styles/Event.css';

const Event: React.FC<eventTypes> = ({id, timelinePosition, name}) => {

  return (
    <div key={id} className="EventContainer" style={{left: timelinePosition+'%'}}>
      {name}
    </div>
  );
}

export default Event;