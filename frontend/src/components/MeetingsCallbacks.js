import React, { useState, useRef }  from "react";
import {
  Spinner,
  Button, 
  Modal,
  ListGroup
} from 'react-bootstrap';
import Http  from './Http';

const API_URL = process.env.REACT_APP_SERVER_URL;

function CallbackDetail (props) {
  const { item } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteRecording = (recording_id) => {
    setShow(false);
    alert('Are you sure to delete?')
  };

  var group = (item.event?? 'other').split(':')
  switch (group[0]) {
    case 'recording':
      var btn = (group[1] && group[1] == 'uploaded')? 
          <>
            <a size="sm" variant="primary" 
              href={item['url']}
              target="_blank"
            >Download</a><br />
            <Button size="sm" variant="primary" onClick={handleShow}>
              Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>Confirm to Delete?</Modal.Body>
              <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button size="sm" variant="primary" 
                    onClick={ e => handleDeleteRecording(item['recording_id']) }
                >Delete</Button>
              </Modal.Footer>
            </Modal>
          </>
          : '';
      return (
        <ListGroup.Item className="list" >
          {item['event']} <br />
          recording_id: {item['recording_id']} <br />
          session_id: {item['session_id']} <br />
          {btn}
        </ListGroup.Item>
      )
    case 'room':
      return (
        <ListGroup.Item className="list" >
          {item['event']} <br />
          room_id: {item['room_id']} <br />
          room_type: {item['room_type']} <br />
          expires_at: {item['expires_at']} <br />
        </ListGroup.Item>
      )
    case 'session':
      var participant_id = (group[1] 
              && group[1] == 'participant')? item['participant_id'] : ''
      return (
        <ListGroup.Item className="list" >
          {item['event']} <br />
          room_id: {item['room_id']} <br />
          session_id: {item['session_id']} <br />
          {participant_id}
        </ListGroup.Item>
      )
    default:
      return <ListGroup.Item className="list" >
        <p className="text-break mx-0 my-0">{ JSON.stringify(item) }</p>
      </ListGroup.Item>
  }
}

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
        //("listCallbacks", data, typeof data);
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
              <CallbackDetail item={item} key={index} />
            )
          })
        }
      </ListGroup>
    </>);
  }
}


export default MeetingsCallbacks;