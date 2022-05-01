import React, { useState, useRef }  from "react";
import {
  Spinner,
  ListGroup
} from 'react-bootstrap';
import Http  from './Http';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Callbacks
 */
class MeetingsCallbacks extends React.Component {
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
    Http.get(API_URL + '/meetings/messageEvents')
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
      <h3>Callbacks</h3>
      <p hidden={ this.state.showSpinner } >Total: {this.state.list.length || 0}</p>
      <Spinner animation="border" role="status" hidden={ !this.state.showSpinner } />
      <ListGroup>
        {
          this.state.list.map((item, index) => {
            return (
              <ListGroup.Item className="list" key={index}> 
                <p className="text-break mx-0 my-0">{JSON.stringify(item)}</p>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>);
  }
}


export default MeetingsCallbacks;