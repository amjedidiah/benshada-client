import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { loadForm, doneForm } from "../../actions/load";

class BenshadaForm extends React.Component {
  constructor(props) {
    super(props);
    this.pRef = React.createRef();
  }

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div
          className="alert text-danger alert-dismissible fade show p-0"
          role="alert"
        >
          <small>{error}</small>
          {/* <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
        </div>
      );
    }
  }

  renderInput = ({
    input,
    icon,
    placeholder,
    meta,
    type,
    required,
    autoComplete
  }) => {
    //meta to help us display error
    const className = `border border-${
      meta.error && meta.touched ? "danger" : ""
    }`;
    return (
      <>
        <div className="input-group my-3">
          <div className="input-group-append">
            <span
              className={`input-group-text bg-white border-top-0 border-right-0 border-left-0 ${className}`}
              id="basic-addon2"
            >
              <i className={`${icon} text-primary`} />
            </span>
          </div>
          <input
            className={`form-control border-top-0 border-right-0 border-left-0 ${className}`}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            {...input}
          />
        </div>
        {this.renderError(meta)}
      </>
    );
  };

  
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

  render() {
    let { valid, pristine, submitting, handleSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        className={this.props.className}
      >
        {this.props.btn === "Register" ? (
          <Field
            icon="fas fa-user"
            component={this.renderInput}
            placeholder="FullName"
            type="text"
            name="name"
            required="required"
            autoComplete="off"
          />
        ) : (
          ""
        )}
        <Field
          icon="fas fa-envelope"
          component={this.renderInput}
          placeholder="Email Address"
          type="email"
          name="email"
          required="required"
        />
        <Field
          icon="fas fa-lock"
          component={this.renderInput}
          placeholder="Password"
          type="password"
          name="password"
          required="required"
          autoComplete="off"
        />
        <div
          className="alert text-danger alert-dismissible fade show p-0"
          role="alert"
        >
          <small ref={this.pRef}></small>
        </div>
        <button
          className="mt-3 w-100 btn btn-primary"
          type="submit"
          name="button"
          disabled={!valid || submitting || pristine}
        >
          {this.props.btn}
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  let errors = { password: [] };

  if ("name" in formValues) {
    if (/[A-Z]/.test(formValues.password) === false) {
      errors.password.push(`Password must contain an uppercase letter\r\n.`);
    }

    if (/\d/.test(formValues.password) === false) {
      errors.password.push("Password must contain a number");
    }
  }

  if (errors.password.length === 0) {
    errors = {};
  }

  // .title && .description because that's the name we gave our fields
  return errors;
};

export default connect(
  null,
  { loadForm, doneForm }
)(
  reduxForm({
    form: "benshadaForm",
    validate
  })(BenshadaForm)
);
