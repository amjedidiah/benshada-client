import React from "react";
import { Toast } from "react-bootstrap";
import { actionDone } from "../../actions/load";
import { connect } from "react-redux";

const FormToast = props => {
  let { message, show } = props;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "2.5%",
        right: "1.5%",
        zIndex: 9999999999
      }}
    >
      <Toast onClose={() => props.actionDone()} show={show} delay={3000} autohide>
        <Toast.Header>
          <small className="text-uppercase font-weight-bold mr-auto">
            alert
          </small>
          {/* <small>just now</small> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default connect(null, { actionDone })(FormToast);
