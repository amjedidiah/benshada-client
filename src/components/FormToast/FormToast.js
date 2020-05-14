import React from 'react';
import { Toast } from 'react-bootstrap';
import { actionDone } from '../../actions/load';
import { connect } from 'react-redux';

import './FormToast.css';

const FormToast = (props) => {
  let { message, show } = props;

  return (
    <div aria-live="polite" aria-atomic="true" className="toast-holder">
      <Toast onClose={() => props.actionDone()} show={show} delay={2000} className="hello" autohide>
        <Toast.Header>
          <small className="text-uppercase font-weight-bold mr-auto">alert</small>
          {/* <small>just now</small> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default connect(null, { actionDone })(FormToast);
