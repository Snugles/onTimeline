import React from 'react';
import eventTypes from '../interfaces/eventTypes';
import './styles/Event.css';

const Event: React.FC<eventTypes> = ({id, timelinePosition, info, name, timeline_date}) => {

  return (
    <div key={id} className="EventContainer" style={{left: timelinePosition}}>
      <div>
        {info}
      </div>
      <div>
        {name}
      </div>
      <div>
        {timeline_date}
      </div>
    </div>
  );
}

export default Event;