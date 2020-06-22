import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import FormIcon from './formIcon.js';

export default class Multi extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    touched: PropTypes.bool,
    error: PropTypes.string
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

  render = () => {
    const {
      icon,
      action,
      input,
      label,
      touched,
      error,
      options
    } = this.props;

    const id = `${action}${input.name}`;

    return (
      <div className="d-flex align-items-center">
        <FormIcon icon={icon} />
        <div className="flex-grow-1">
          <label htmlFor={`${id}`}>{label}</label>
          <Select
            {...input}
            options={options}
            value={input.value}
            isMulti={true}
            id={id} className="form-control" style={{ zIndex: 999 }}
            onBlur={() => input.onBlur([...input.value])}
          />
        </div>
        <div className="form-validation-response">
          {this.renderValidateIcon(touched, error)}
        </div>
      </div>
    );
  };
}
