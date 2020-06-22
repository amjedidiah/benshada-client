import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FormIcon from './formIcon.js';

export default class DataList extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    touched: PropTypes.bool,
    error: PropTypes.string,
    placeholder: PropTypes.string
  };

  renderValidateIcon = (touched, error) => {
    let className = null;
    let icon = null;
    if (touched) {
      className = error === undefined ? 'text-success' : 'text-danger';
      icon = error === undefined ? faCheckCircle : faTimes;

      return <FontAwesomeIcon className={className} icon={icon} />;
    }
    return false;
  };

  renderOptions = (options, id) => options.map((option, i) => <option key={`${id}${i}`} value={option} />);

  render = () => {
    const {
      icon, action, input, label, touched, error, options, placeholder
    } = this.props;

    const id = `${action}${input.name}`;

    return (
      <div className="d-flex align-items-center">
        <FormIcon icon={icon} />
        <div className="flex-grow-1">
          <label htmlFor={`${id}`}>{label}</label>
          <input {...input} placeholder={placeholder} type="text" className="form-control" id={id} list={`${id}s`} />

          <datalist id={`${id}s`}>{this.renderOptions(options, id)}</datalist>
        </div>
        <div className="form-validation-response">{this.renderValidateIcon(touched, error)}</div>
      </div>
    );
  };
}
