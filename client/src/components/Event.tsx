import React from 'react';
import eventTypes from '../interfaces/eventTypes';
import './styles/Event.css';

const Event: React.FC<eventTypes> = ({id, timelinePosition, info, name, day, month, year, time}) => {

  return (
    <div key={id} className="EventContainer" style={{left: timelinePosition+'%'}}>
      <div>
        {info}
      </div>
      <div>
        {name}
      </div>
      <div>
        {`${day} ${month} ${year} ${time}`}
      </div>
    </div>
  );
}

export default Event;