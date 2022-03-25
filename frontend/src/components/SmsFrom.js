/**
 * send an invite via SMS API
 */
import React, { useState, useRef }  from "react";
import { 
  Button, 
  Form,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import Http  from './Http';
import AlertDismissible from './AlertDismissible';

const API_URL = process.env.REACT_APP_API_URL;

function SmsFrom(props) {
    const alertRef = useRef();
    const [spinner, showSpinner] = useState(false);
    // - send sms
    const sendSms = (e) => {
      e.preventDefault();
      showSpinner(true);
      const formData = new FormData(e.target);
      const formDataJson = Object.fromEntries(formData.entries());
      // console.log("sendSms", formDataJson);
      Http.post(API_URL + '/sendsms', formDataJson)
      .then(data => {
        showSpinner(false);
        console.log("sendSms", data);
        if (typeof data === 'string') data = JSON.parse(data);
        alertRef.current.hide()
        alertRef.current.show(data);
      })
      .catch( error => {
        showSpinner(false);
        alertRef.current.hide()
        alertRef.current.show(error, 'Error', 'secondary');
        console.error(error);
      });
      // eof Http.post
    };

    return (<>
      <h5>{props.title? props.title : "Invite people with an SMS"}</h5>
      <Form onSubmit={sendSms}>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={3}>Recipient phone number:</Form.Label>
          <Col>
          <Form.Control as="input" name="to"
            defaultValue={props.to? props.to : "8615814034648"}
          /></Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={3}>Message: </Form.Label>
          <Col><Form.Control as="textarea" name="text" rows={3} 
            value={props.text? props.text : "Hello from Vonage Meetings API"}
            onChange={() => {}}
          /></Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col sm={{offset:3}}>
            <Button type="submit" size="sm" variant="primary" hidden={ spinner } >Send an invite</Button>
            <Spinner animation="border" role="status" hidden={ !spinner } />
          </Col>
        </Form.Group>
      </Form>
      <AlertDismissible ref={alertRef} />
    </>)
  };

export default SmsFrom;