import React, {useState, useEffect} from 'react';
import service from '../service';
import './styles/Homepage.css';
import {Link} from 'react-router-dom';
import timelineInterface from '../interfaces/timeline';

function Homepage() {
  const [userTimelines, setUserTimelines] = useState([{name:'',id:''}]);
  const [newName, setNewName] = useState('');

  useEffect(()=>{
    service.getTimelines()
      .then(res=>{
        if (res){
          if (res.message) {
            window.location.href = 'http://localhost:3000/login';
          }
          setUserTimelines(res);
        }
      });
  },[]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    service.createTimeline(newName)
      .then((res:any)=>{
        if (res) {
          setUserTimelines([...userTimelines,res]);
        } else {
          console.error('error');
        }})
      .catch((e:string) => console.error(e));
  }

  const handleChange = (e:any) => {
    setNewName(e.target.value);
  }

  return (
    <div className="HomeContainer">
      {userTimelines&&userTimelines.length?userTimelines.map((timeline:timelineInterface) =>
        <Link to={`/timeline/${timeline.id}`} style={{textDecoration: 'none', color:'black'}} key={timeline.id}>
          {timeline.name}
        </Link>):
        <div>
          No Timelines Found
        </div>}
        <form onSubmit = {handleSubmit} className='homeForm'>
          <label>Title:</label>
          <input type="text" name="name" value={newName} onChange={handleChange} className="loginInput"/>
          <input type="submit" value="Create Topic"/>
        </form>
    </div>
  );
}

export default Homepage;