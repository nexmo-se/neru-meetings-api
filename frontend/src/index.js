import React, { useState, useRef }  from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";
import {
  Nav,
  Navbar,
  Stack,
  Spinner,
  ListGroup
} from 'react-bootstrap';

import Http  from './components/Http';
import MeetingsCreate from './components/MeetingsCreate';
import MeetingsList from './components/MeetingsList';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

const API_URL = process.env.REACT_APP_API_URL;
const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * Callbacks
 */
class Callbacks extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showSpinner: false,
      list:[]
    }
  }
  // - Get all available callbacks todo
  listCallbacks = (e) => {
    this.setState({
      showSpinner: true,
    });
    Http.get(API_URL + '/messagesEvents')
      .then(data => {
        console.log("listCallbacks", data, typeof data);
        this.setState({
          showSpinner: false,
          list: data
        });
      }).catch(error => {
        this.setState({
          showSpinner: false,
        });
        console.error(error)
      });
  }
  componentDidMount() {
    this.listCallbacks()
    this.timer = setInterval(() => this.listCallbacks(), 15000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (<>
      <h3>Callbacks </h3>
      <p hidden={ this.state.showSpinner } >Total: {this.state.list.length || 0}</p>
      <Spinner animation="border" role="status" hidden={ !this.state.showSpinner } />
      <ListGroup>
        {
          this.state.list.map((item, index) => {
            return (
              <ListGroup.Item className="list" key={index}> 
                {JSON.stringify(item)}
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>);
  }
}

class App extends React.Component {
  render() {
    return (<> 
      <Stack className="w-75 mx-auto">
        <div className="col-md-12 text-center">
          <h1>Try the Meetings API</h1>
          <p>Meetings API allows you to create your own meetings with a single API call.</p>
        </div>
        <div className="col-md-12 border-bottom">
          <Navbar className="d-md-flex navbar-nav">
            <Navbar.Collapse><Nav>
              <Nav.Link href={PUBLIC_URL + "/create"} selected>Create a Room</Nav.Link>
              <Nav.Link href={PUBLIC_URL + "/list"}>Available Rooms</Nav.Link>
              <Nav.Link href={PUBLIC_URL + "/callbacks"}>Callbacks</Nav.Link>
            </Nav></Navbar.Collapse>
          </Navbar>
        </div>
        <div className="col-md-12 mt-3">
          <Router>
            <Routes>
                <Route path={PUBLIC_URL + "/create"} element={<MeetingsCreate />} />
                <Route path={PUBLIC_URL + "/list"} element={<MeetingsList />} />
                <Route path={PUBLIC_URL + "/callbacks"} element={<Callbacks />} />
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
