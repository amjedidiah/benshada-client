import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast } from "react-bootstrap";

class FormToast extends Component {
  render() {
    let { body, show } = this.props;

    return body === null || body === "" || body === undefined ? (
      ""
    ) : (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          bottom: "2.5%",
          right: "1.5%"
        }}
      >
        <Toast show={show}>
          <Toast.Header>
            <small className="text-uppercase font-weight-bold mr-auto">
              alert
            </small>
            {/* <small>just now</small> */}
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

const mapStateToProps = state => ({ show: state.load.show });

export default connect(mapStateToProps)(FormToast);
