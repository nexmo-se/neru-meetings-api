import React, { useRef }  from "react";
import {
  Button,
  ListGroup,
  Spinner
} from 'react-bootstrap';

import Http  from './Http';
import SmsFrom from './SmsFrom';
import AlertDismissible from './AlertDismissible';

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
      list:[]
    }
  }
  // - Get all available rooms
  listMeetingRooms = (e) => {
    this.setState({
      showSpinner: true,
    });
    Http.get(API_URL + '/meetingsRoom')
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
    Http.delete(API_URL + '/meetingsRoom?id=' + e.target.value)
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
        <div size="sm" ref={smsFormRef} hidden={true} className="bg-light p-3">
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
                <Button variant="link" size="sm" value={item.id} onClick={this.delMeetingRoom}>Delete</Button>
                <ListSmsFrom data={item}/>
                <ListRoomDetail data={item}/>
                <Button size="sm" href={item._links.guest_url.href} target="_blank" rel="noreferrer" >Join</Button>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
      <br></br>
    </>)
  }
 }

 export default MeetingsList;