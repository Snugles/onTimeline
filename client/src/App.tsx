import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Timeline from './screens/Timeline';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Homepage}/>
        <Route path="/Timeline/:id" exact component={Timeline}/>
        <Route path="/login" component={Login}/>
      </Router>
    </div>
  );
}

export default App;
