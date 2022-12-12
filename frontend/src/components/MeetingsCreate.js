import React, { useState, useRef, forwardRef, useImperativeHandle }  from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Http  from './Http';
import SmsFrom from './SmsFrom';
import AlertDismissible from './AlertDismissible';

import "react-datepicker/dist/react-datepicker.css";

const API_URL = process.env.REACT_APP_SERVER_URL;

/**
 * Meetings - Create a Room
 */
class MeetingsCreate extends React.Component {
  constructor (props) {
    super(props);
    //
    this.datePickerRef = React.createRef();
    this.alertRef = React.createRef();
    this.state = {
        showSpinner: false,
        showSmsForm: false,
        newRoom: {},
        inviteMsg: '',
    }
  }
  // - Create a room
  createRoom = (e) => {
    this.setState({
      showSpinner: true,
    });
    e.preventDefault();
    const formDataJson = Object.fromEntries((new FormData(e.target)).entries());
    // ---
    formDataJson.recording_options = {
      auto_record: (formDataJson.auto_record && formDataJson.auto_record == 'on')? true : false
    }
    if (formDataJson.auto_record) delete formDataJson.auto_record;
    formDataJson.expire_after_use = formDataJson.expire_after_use && formDataJson.expire_after_use == 'on'? true : false;
    formDataJson.expires_at = this.datePickerRef.current.getISOString();
    // ---
    console.log(formDataJson);
    Http.post(API_URL + '/meetings/rooms', formDataJson)
      .then(data => {
        if (typeof data === "string") throw new Error(data);
        console.log('createRoom', data)
        this.alertRef.current.show(data, "API Response", "info");
        data.host_url = data._links.host_url.href;
        data.guest_url = data._links.guest_url.href;
        this.setState({
          showSpinner: false,
          showSmsForm: true,
          newRoom: data,
          inviteMsg: 'Join my video call on the following link: ' +  data.guest_url,
        });
      }).catch( error => {
        this.setState({
          showSpinner: false,
        });
        console.error(error);
      });
  };

  render() {
    const ExpiresAt = forwardRef((props, ref) => {
      const tmr = new Date((new Date()).getTime() + 86400000);
      const nextYear = new Date((new Date()).setFullYear((new Date()).getFullYear() + 1));
      const [startDate, setStartDate] = useState(tmr);
      useImperativeHandle(ref, () => ({
        getISOString: () => (new Date(startDate)).toISOString()
      }));
      return (<>
        <DatePicker
          selected={startDate}
          dateFormat="yyyy-MM-dd h:mm aa"
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          maxDate={nextYear}
          showDisabledMonthNavigation
          showTimeSelect
          disabled={props.disabled}
        />
      </>
      );
    });

    return (<>
      <h3>Create a Room</h3>
      <div hidden={this.state.showSmsForm}>
        <Form onSubmit={this.createRoom}>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Display Name:</Form.Label>
            <Col><Form.Control as="input" name="display_name"
                defaultValue={'My Meetings Room created @ ' + (new Date()).toISOString()}/>
            </Col></Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Meta Data:</Form.Label>
            <Col><Form.Control as="input" name="metadata" defaultValue="my-data-here"/></Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Type:</Form.Label>
            <Col>
              <Form.Check type="radio" label="Instant" name="type" value="instant" defaultChecked />
              <Form.Check inline type="radio" label="Long Term" name="type" value="long_term"/>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Expire After Use:</Form.Label>
            <Col className="bg-light p-2">
              <Form.Check type="checkbox" size="sm" name="expire_after_use" 
                  defaultChecked={false}
                  label="Close the room after a session ends."
                />
              <Form.Text size="sm">* Only relevant for long_term rooms</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Expires At:</Form.Label>
            <Col className="bg-light p-2">
              <ExpiresAt disabled={false} ref={this.datePickerRef} />
              <Form.Text size="sm">* Required only for long-term room creation.</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>Auto Record:</Form.Label>
            <Col>
              <Form.Check type="checkbox" size="sm" name="auto_record" 
                  defaultChecked={false}
                  label="Automatically record all sessions in this room."
                />
              <Form.Text size="sm">* Recording cannot be stopped when this is set to true.</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row}>
            <Col sm={{offset:2}}>
              <Button type="submit" variant="primary" hidden={ this.state.showSpinner } >Create a meeting</Button>
              <Spinner animation="border" role="status" hidden={ !this.state.showSpinner } />
            </Col>
          </Form.Group>
        </Form>
        <br />
      </div>
      <div hidden={!this.state.showSmsForm} className="bg-light">
      <Alert variant="success">
          <Alert.Heading>You successfully created a meeting room</Alert.Heading>
          <hr />
          <Button variant="link" 
              href={this.state.newRoom.host_url} >Join as host</Button>
          <Button variant="link" 
              onClick={() => {
                  this.setState({showSmsForm: false});
                  this.alertRef.current.hide();
              }}>Go Back to Create a Room</Button>
        </Alert>
      </div>
      <div hidden={!this.state.showSmsForm} className="bg-light p-3">
        <SmsFrom text={this.state.inviteMsg}/> 
      </div>
      <AlertDismissible ref={this.alertRef} />
    </>)
  }
}

export default MeetingsCreate;