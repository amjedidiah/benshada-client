import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { loadForm, doneForm } from "../../actions/load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLock,
  faUser,
  faEnvelope,
  faAlignJustify
} from "@fortawesome/free-solid-svg-icons";

class BenshadaForm extends React.Component {
  constructor(props) {
    super(props);
    this.pRef = React.createRef();
  }

  onSubmit = formValues => {
    this.props.loadForm();
    this.props
      .onSubmitForm(formValues)
      .then(response => {
        this.props.doneForm();
        if (this.pRef.current) {
          this.pRef.current.innerHTML = response.response
            ? response.response.data.message
            : response;
        }
      })
      .catch(error => {
        this.props.doneForm();
        if (this.pRef.current) {
          this.pRef.current.innerHTML = error;
        }
        if (error.validationErrors) {
          throw new SubmissionError(error.validationErrors);
        }
      });
  };

  makeid(length) {
    let result = "",
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="text-danger text-left w-100">{error}</small>;
    }
  }

  renderFieldIconPrepend(name) {
    return name === "password" || name === "confirmpassword" ? (
      <div className="input-group-append border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
    ) : (
      ""
    );
  }

  renderFieldIconHelper(icon, name) {
    return icon !== 0 || icon === undefined ? (
      <div className="input-group-prepend border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          {this.renderFieldIcon(name)}
        </div>
      </div>
    ) : (
      ""
    );
  }

  renderFieldIcon(name) {
    switch (name) {
      case "name":
        return <FontAwesomeIcon icon={faUser} />;
      case "email":
        return <FontAwesomeIcon icon={faEnvelope} />;
      case "confirmpassword":
        return <FontAwesomeIcon icon={faLock} />;
      case "password":
        return <FontAwesomeIcon icon={faLock} />;
      default:
        return <FontAwesomeIcon icon={faAlignJustify} />;
    }
  }

  renderSelectOptions(options) {
    return options.map((option, key) => {
      let { value, placeholder } = option;
      return (
        <option key={key} value={value}>
          {placeholder}
        </option>
      );
    });
  }

  renderFormControl(
    input,
    name,
    label,
    varClass,
    type,
    options,
    className,
    meta
  ) {
    const { error, touched } = meta;
    className = `form-control bg-white border-left-0 border-right-0 border-top-0 rounded-0 ${className}`;

    let title = touched && error ? "error" : "",
      randString = this.makeid(5);

    switch (varClass) {
      case "input":
        return (
          <input
            type={type}
            className={className}
            id={`${randString}${name}`}
            aria-describedby={`${name}Help`}
            placeholder={label}
            title={title}
            {...input}
          />
        );
      case "select":
        return (
          <select
            className={className}
            id={name}
            aria-describedby={`${name}Help`}
            title={title}
            {...input}
          >
            <option defaultValue disabled>
              Select A Category
            </option>
            {this.renderSelectOptions(options)}
          </select>
        );
      case "textarea":
        return (
          <textarea
            className={className}
            id={name}
            aria-describedby={`${name}Help`}
            placeholder={label}
            title={title}
            rows="2"
            required
            {...input}
          ></textarea>
        );
      default:
        break;
    }
  }

  renderFormField = ({
    input,
    label,
    meta,
    varClass,
    type,
    options,
    icon,
    row
  }) => {
    const { name } = input;

    //meta to help us display error
    const className = meta.error && meta.touched ? "error" : "";

    return (
      <div
        className={`my-3 ${
          row === undefined || row === 0
            ? ""
            : row === 1
            ? "d-inline-flex w-50 pr-5"
            : "d-inline-flex w-50 pl-5"
        }`}
      >
        <div className="w-100">
          <label className="text-capitalize text-primary" htmlFor="profileName">
            {label}
          </label>
          <div className="input-group">
            {this.renderFieldIconHelper(icon, name)}

            {this.renderFormControl(
              input,
              name,
              label,
              varClass,
              type,
              options,
              className,
              meta
            )}
            {this.renderFieldIconPrepend(name)}
          </div>
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  renderFields(fields) {
    return fields.map((field, key) => {
      let { desc, placeholder, varClass, type, options, icon, row } = field;
      return (
        <Field
          name={desc}
          component={this.renderFormField}
          label={placeholder}
          varClass={varClass}
          type={type}
          options={options}
          key={key}
          icon={icon}
          row={row}
        />
      );
    });
  }

  renderButtons(buttons) {
    return buttons.map((button, key) => {
      let { value, className } = button;
      return (
        <button
          key={key}
          className={`${className} mt-3 w-100 btn text-uppercase border border-0`}
        >
          {value}
        </button>
      );
    });
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={this.props.className}
      >
        {this.renderFields(this.props.fields)}
        {this.renderButtons(this.props.buttons)}
      </form>
    );
  }
}

const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = ({
  name,
  email,
  password,
  confirmpassword,
  need,
  approach,
  benefits,
  competition
}) => {
  const errors = {};

  errors.name = !name ? "Please enter your name" : "";

  errors.email = !email
    ? "Please enter a email"
    : emailIsValid(email)
    ? ""
    : "Please enter a valid email address";

  errors.password = !password
    ? "Please enter a password"
    : !/\d/.test(password)
    ? "Password must contain a number"
    : !/[A-Z]/.test(password)
    ? "Password must contain a capital letter"
    : password.length < 6
    ? "Password must be at least 6 characters long"
    : "";

  errors.confirmpassword =
    confirmpassword !== password && confirmpassword
      ? "Passwords do not match"
      : "";

  //Validate Idea Form
  errors.need = !need ? "This field is required" : "";
  errors.approach = !approach ? "This field is required" : "";
  errors.benefits = !benefits ? "This field is required" : "";
  // errors.competition = !competition ? "This field is required" : "";
  // console.log(errors);

  return errors;
};

export default connect(null, { loadForm, doneForm })(
  reduxForm({
    form: "benshadaForm",
    validate
  })(BenshadaForm)
);
