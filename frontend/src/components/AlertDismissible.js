/**
 * send an invite via SMS API
 */
import React, { useState, forwardRef, useImperativeHandle }  from "react";
import { Alert } from 'react-bootstrap';

const AlertDismissible = forwardRef((props, ref) => {
  const [show, setShow] = useState(props.show || false);
  const [msg, setMsg] = useState(props.msg || "");
  const [heading, setHeading] = useState(props.heading || "Success");
  const [variant, setVariant] = useState(props.variant || "info");

  useImperativeHandle(ref, () => ({
      hide: () => setShow(false),
      show: (msg, heading = "Success", variant = "info") => {
        if (show) return setShow(false);
        setShow(true);
        setMsg(msg);
        setHeading(heading);
        setVariant(variant);
      }
  }));
  
  return (<>
    <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>
      <Alert.Heading size="sm">{heading}</Alert.Heading>
      <hr />{
        Object.entries(msg).map((e, index) => (
          <p className="text-break mx-0 my-0" key={index}> {(typeof e === 'string')? e : JSON.stringify(e)}</p>
        ) )
      }
    </Alert>
  </>);
});

// - variant -
// 'primary',
// 'secondary',
// 'success',
// 'danger',
// 'warning',
// 'info',
// 'light',
// 'dark',

export default AlertDismissible;