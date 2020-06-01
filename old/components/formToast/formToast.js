import React from './node_modules/react';
import { Toast } from './node_modules/react-bootstrap';
import { connect } from './node_modules/react-redux';
import PropTypes from './node_modules/prop-types';
import { actionDone } from '../../actions/load.js';

import './FormToast.css';

class FormToast extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
    actionDone: PropTypes.func
  }

  render() {
    const { message, show } = this.props;

    return (
    <div aria-live="polite" aria-atomic="true" className="toast-holder">
      <Toast onClose={() => this.props.actionDone()} show={show} delay={2000} className="hello" autohide>
        <Toast.Header>
          <small className="text-uppercase font-weight-bold mr-auto">alert</small>
          {/* <small>just now</small> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
    );
  }
}

export default connect(null, { actionDone })(FormToast);
