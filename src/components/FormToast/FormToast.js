import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast } from "react-bootstrap";

class FormToast extends Component {
  render() {
    let { body, show } = this.props;

    return body === null || body === "" ? (
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
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="text-uppercase mr-auto">form response</strong>
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
