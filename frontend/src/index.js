import React, { useState, useRef }  from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";
import {
  Nav,
  Tab, Tabs,
  Stack
} from 'react-bootstrap';
import MeetingsCreate from './components/MeetingsCreate';
import MeetingsList from './components/MeetingsList';
import MeetingsCallbacks from './components/MeetingsCallbacks';

import 'bootstrap/dist/css/bootstrap.min.css';

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends React.Component {
  render() {
    return (<> 
      <Stack className="w-75 mx-auto">
        <div className="col-md-12 text-center">
          <h1>Try the Meetings API</h1>
          <p>Meetings API allows you to create your own meetings with a single API call.</p>
        </div>
        <Nav justify variant="tabs" className="border-bottom">
          <Nav.Item>
            <Nav.Link href={PUBLIC_URL + "/create"}>Create a Room</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={PUBLIC_URL + "/list"}>Available Rooms</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={PUBLIC_URL + "/callbacks"}>Callbacks</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="col-md-12 mt-3">
          <Router>
            <Routes>
                <Route path={PUBLIC_URL + "/create"} element={<MeetingsCreate />} />
                <Route path={PUBLIC_URL + "/list"} element={<MeetingsList />} />
                <Route path={PUBLIC_URL + "/callbacks"} element={<MeetingsCallbacks />} />
            </Routes>
          </Router>
        </div>
      </Stack>
    </>);
  }
}

// ========================================
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
