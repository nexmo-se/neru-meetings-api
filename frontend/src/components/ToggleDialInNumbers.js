/**
 * send an invite via SMS API
 */
import React, { useState, useRef, forwardRef, useImperativeHandle }  from "react";
import {
    Button,
    ListGroup,
    Spinner,
    Form,
    Toast
  } from 'react-bootstrap';
import Http  from './Http';
const API_URL = process.env.REACT_APP_API_URL;

function ToggleDialInNumbers (props) {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    const detailRef = useRef();
    var defaultDailInNumber = '';
    return (<>
      <Button size="sm" onClick={() => setShow(!show)} variant="outline-secondary">
        Toggle Dial In Numbers
      </Button>
      <Toast onClose={toggleShow} show={show} style={{width: "430px"}}>
        <Toast.Header>
            <Form.Select 
                onChange={(e) => {
                    var number = e.target.value;
                    detailRef.current.innerHTML = "Dial-in: +" + number;
                    Http.get(API_URL + `/ni/${number}/`)
                        .then(data => {
                            console.log("ni", data, typeof data);
                            detailRef.current.innerHTML = detailRef.current.innerHTML + " / Local fromat: " + data;
                        }).catch(error => {
                            console.error(error)
                        });
                }}>
            {
              props.dialInNumbers.map((item, index) => {
                defaultDailInNumber = "en-US" === item.locale? item.number + " / Local fromat: (732) 200-1872": defaultDailInNumber
                return (
                  <option value={item.number} key={index} selected={"en-US" === item.locale} > 
                    {item.display_name} </option>
                )
              })
            }
            </Form.Select>
          </Toast.Header>
        <Toast.Body>
          <ListGroup>
            <ListGroup.Item ref={detailRef}>Dial-in: +{defaultDailInNumber}</ListGroup.Item>
            <ListGroup.Item>Pin Code(Meeting ID): {props.meetings.meeting_code?? ""}</ListGroup.Item>
            <ListGroup.Item>Click to dial: {'( - todo - intergrate with voice client sdk for in-app calls )'}</ListGroup.Item>
            <ListGroup.Item>Meeting Link: 
                <Button variant="link" size="sm" 
                  href={props.meetings._links.guest_url.href?? ""} target="_blank" rel="noreferrer">{props.meetings._links.guest_url.href?? ""}</Button>
            </ListGroup.Item>
          </ListGroup>
          </Toast.Body>
      </Toast>
    </>);
};

export default ToggleDialInNumbers;