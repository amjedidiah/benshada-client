import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faLock, faUser, faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import './BenshadaForm.css';
// import { stateSelect } from "../../assets/location";

class BenshadaForm extends React.Component {
  static propTypes = {
    onSubmitForm: PropTypes.func,
    initialize: PropTypes.func,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    className: PropTypes.string,
    fields: PropTypes.array,
    buttons: PropTypes.array
  }

  onSubmit = (formValues) => this.props.onSubmitForm(formValues);

  makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  renderError = ({ error, touched }, help) => {
    if (touched && error) {
      return <small className="text-danger text-left w-100">{error}</small>;
    }
    return <small className="text-left w-100">{help}</small>;
  }

  renderFieldIconPrepend = (name) => (name === 'password' || name === 'confirmpassword' ? (
      <div className="input-group-append border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
  ) : (
    ''
  ))

  renderFieldIconHelper(icon, name) {
    return icon !== 0 || icon === undefined ? (
      <div className="input-group-prepend border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          {this.renderFieldIcon(name)}
        </div>
      </div>
    ) : (
      ''
    );
  }

  renderFieldIcon = (name) => {
    // let { initialValues } = this.props;
    // user = initialValues.email !== undefined ? initialValues : {};
    // selectStateObject = stateSelect.filter(
    //   selectState => selectState.state === state
    // );

    switch (name) {
      case 'name':
        return <FontAwesomeIcon icon={faUser} />;
      case 'email':
        return <FontAwesomeIcon icon={faEnvelope} />;
      case 'confirmpassword':
        return <FontAwesomeIcon icon={faLock} />;
      case 'password':
        return <FontAwesomeIcon icon={faLock} />;
      // default:
      //   return (selectStateObject && selectStateObject.country) ===
      //     "Nigeria" ? (
      //     <span>&#8358;</span>
      //   ) : (selectStateObject && selectStateObject.country) === "Ghana" ? (
      //     <span>GHS</span>
      //   ) : (
      //     <FontAwesomeIcon icon={faDollarSign} />
      //   );
      default:
        return <span>&#8358;</span>;
    }
  }

  renderSelectOptions = (options) => options.map((option, key) => (
        <option key={key} value={option}>
          {option}
        </option>
  ))

  renderFormControl = (input, name, placeholder, varClass, type, options, className, meta) => {
    const { error, touched } = meta;
    const fullClassName = `form-control bg-white border-left-0 border-right-0 border-top-0 rounded-0 ${className}`;

    const title = touched && error ? 'error' : '';
    const randString = this.makeid(5);

    switch (varClass) {
      case 'input':
        return (
          <input
            type={type}
            className={fullClassName}
            id={`${randString}${name}`}
            aria-describedby={`${name}Help`}
            placeholder={placeholder}
            title={title}
            min={0}
            required
            {...input}
          />
        );
      case 'select':
        return (
          <div className="w-100">
            <input
              className={fullClassName}
              id={`${randString}${name}`}
              aria-describedby={`${name}Help`}
              title={`Select a ${name}`}
              list={`${name}-list`}
              placeholder={placeholder}
              {...input}
            />
            <datalist id={`${name}-list`}>{this.renderSelectOptions(options.sort())}</datalist>
          </div>
        );
      case 'textarea':
        return (
          <textarea
            className={fullClassName}
            id={`${randString}${name}`}
            aria-describedby={`${name}Help`}
            placeholder={placeholder}
            title={title}
            rows="2"
            required
            {...input}
          />
        );
      default:
        return false;
    }
  }

  renderFormField = (formValues) => {
    let {
      placeholder, className
    } = formValues;
    const {
      input, label, meta, varClass, type, options, icon, row, help
    } = formValues;

    const { name } = input;

    // meta to help us display error
    className += (meta.error && meta.touched ? ' error' : '');
    placeholder = placeholder === undefined ? label : placeholder;

    return type === 'hidden' ? (
      ''
    ) : (
      <div
        className={`my-3 ${{ undefined: '', 0: '', 1: 'd-inline-flex w-100 w-md-50 pr-md-5' }[row] || 'd-inline-flex w-100 w-md-50 pl-md-5'
        }`}
      >
        <div className="w-100">
          {label === undefined ? (
            ''
          ) : (
            <label className="text-uppercase m-0 p-0 text-primary" htmlFor="profileName">
              <small className="font-weight-bold">{label}</small>
            </label>
          )}
          <div className="input-group">
            {this.renderFieldIconHelper(icon, name)}

            {this.renderFormControl(
              input, name, placeholder, varClass, type, options, className, meta
            )}
            {this.renderFieldIconPrepend(name)}
          </div>
          {this.renderError(meta, help)}
        </div>
      </div>
    );
  };

  renderFields(fields) {
    return fields.map((field, key) => {
      const {
        desc, placeholder, varClass, type, options, icon, row, label, className, help
      } = field;

      return (
        <Field
          name={desc}
          component={this.renderFormField}
          label={label}
          placeholder={placeholder}
          varClass={varClass}
          type={type}
          options={options}
          key={key}
          icon={icon}
          row={row}
          className={className}
          help={help}
        />
      );
    });
  }

  renderButtons = (buttons) => buttons.map((button, key) => {
    const { value, className } = button;
    return (
        <p key={key}>
          <button className={`${className} mt-3 btn text-uppercase border border-0`}>{value}</button>
        </p>
    );
  })

  componentDidMount() {
    this.props.initialize(this.props.initialValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={this.props.className}>
        {this.renderFields(this.props.fields)}
        {this.renderButtons(this.props.buttons)}
      </form>
    );
  }
}

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = ({
  email, password, confirmpassword
}) => {
  const errors = {};

  if (email) { errors.email = emailIsValid(email) ? '' : 'Please enter a valid email'; }


  if (password) {
    if (!/\d/.test(password)) {
      errors.password = 'Password must contain a number';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain an upperCase letter';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else { errors.password = ''; }
  }


  if (confirmpassword) { errors.confirmpassword = confirmpassword !== password ? 'Passwords do not match' : ''; }

  return errors;
};

// export default connect(mapStateToProps)(
//   reduxForm({
//     form: "benshadaForm",
//     validate
//   })(BenshadaForm)
// );

export default reduxForm({
  form: 'benshadaForm',
  validate
})(BenshadaForm);
