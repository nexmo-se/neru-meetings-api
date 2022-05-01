
import React, { useState, forwardRef, useRef, useImperativeHandle }  from "react";
import {
  Button,
  ListGroup,
  Spinner,
  Form,
  Toast
} from 'react-bootstrap';
import Http  from './Http';
import SmsFrom from './SmsFrom';
import AlertDismissible from './AlertDismissible';
import ToggleDialInNumbers from './ToggleDialInNumbers';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Meetings - Get all available rooms
 */
 class MeetingsList extends React.Component {
  constructor (props) {
    super(props);
    //
    this.state = {
      showSpinner: false,
      dialInNumbers: [],
      list:[]
    }
  }
  // - Get dial in numbers
  listDialInNumbers = (e) => {
    Http.get(API_URL + '/meetings/dial-in-numbers')
      .then(data => {
        console.log("listDialInNumbers", data, typeof data);
        this.setState({
          dialInNumbers: data
        });
      }).catch(error => {
        console.error(error)
      });
  }
  // - Get all available rooms
  listMeetingRooms = (e) => {
    this.setState({
      showSpinner: true,
    });
    Http.get(API_URL + '/meetings/rooms')
      .then(data => {
        console.log("listMeetingRooms", data, typeof data);
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
    this.listDialInNumbers();
    this.listMeetingRooms();
    //this.timer = setInterval(() => this.listMeetingRooms(), 5000);
  }
  componentWillUnmount() {
    //this.timer && clearTimeout(this.timer);
  }
  // - delete a room
  delMeetingRoom = (e) => {
    e.preventDefault();
    this.setState({
      showSpinner: true,
    });
    Http.delete(API_URL + `/meetings/rooms/${e.target.value}/`)
      .then(data => {
        console.log("delMeetingRoom", data, typeof data);
        this.setState({
          showSpinner: false
        });
        this.listMeetingRooms();
      }).catch(error => {
        this.setState({
          showSpinner: false,
        });
        console.error(error)
      });
  }
  render() {
    // ---
    const ListRoomDetail = (props) => {
      const alertRef = useRef();
      return (<>
        <Button variant="link" size="sm" onClick={(e) => {
           alertRef.current.show(props.data, "Detail", "secondary");
        }}>Detail</Button>
        <AlertDismissible ref={alertRef}/>
      </>);
    };
    // ---
    const ListSmsFrom = (props) => {
      const smsFormRef = useRef();
      return (<>
        <Button variant="link" size="sm" 
            onClick={(e) => {smsFormRef.current.hidden = !smsFormRef.current.hidden;}}
        >Send invites via sms</Button>
        <div size="sm" ref={smsFormRef} hidden={true} className="bg-light border p-3">
          <SmsFrom text={"Join my video call on the following link: " + props.data._links.guest_url.href}/> 
        </div>
      </>);
    };
    // ---
    return (<>
      <h3>Available Rooms</h3>
      <p hidden={ this.state.showSpinner } >Total: {this.state.list.length || 0} </p>
      <Spinner animation="border" role="status" hidden={ !this.state.showSpinner } />
      
      <ListGroup>
        {
          this.state.list.map((item, index) => {
            return (
              <ListGroup.Item className="list" key={index}> 
                {item.display_name}
                <br />
                {" "}
                <ToggleDialInNumbers meetings={item} key="din-{index}" dialInNumbers={this.state.dialInNumbers}/>
                <Button variant="link" size="sm" value={item.id} onClick={this.delMeetingRoom}>Delete</Button>
                <ListSmsFrom data={item}/>
                <ListRoomDetail data={item}/>
                <Button size="sm" 
                  href={item._links.host_url.href} target="_blank" rel="noreferrer" >Join as Host</Button>
                {" "}
                <Button  variant="outline-secondary" size="sm" 
                  href={item._links.guest_url.href} target="_blank" rel="noreferrer">Join as Guest</Button>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
      <br></br>
    </>)
  }
 }

const Example = forwardRef((props, ref) => {
  const [showB, setShowB] = useState(true);
  const toggleShowB = () => setShowB(!showB);
  return (<>
    <Toast onClose={setShowB(!showB)} show={showB} animation={false}>
      <Toast.Header>
        <span className="me-auto">{props.data.x}</span>
      </Toast.Header>
      <Toast.Body>
        <ListGroup>
          <ListGroup.Item>Dial-in:</ListGroup.Item>
          <ListGroup.Item>Meeting ID: </ListGroup.Item>
          <ListGroup.Item>Click to dial: {props.data.x}</ListGroup.Item>
          <ListGroup.Item>Link: {props.data.x}</ListGroup.Item>
        </ListGroup>
        </Toast.Body>
    </Toast>
    </>
  );
})

export default MeetingsList;
