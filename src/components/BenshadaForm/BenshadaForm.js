import React from "react";
import { Field, reduxForm } from "redux-form";

class BenshadaForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show my-3"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  renderInput = ({ input, icon, placeholder, meta, type, required }) => {
    //meta to help us display error
    const className = `border border-${
      meta.error && meta.touched ? "danger" : ""
    }`;
    return (
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
          {...input}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmitForm(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={this.props.className}
      >
        {this.props.btn === "Register" ? (
          <Field
            icon="fas fa-user"
            component={this.renderInput}
            placeholder="FullName"
            type="text"
            name="fullname"
            required="required"
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
        />
        <button
          className="mt-3 w-100 btn btn-primary"
          type="submit"
          name="button"
        >
          {this.props.btn}
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  let errors = { password: [] };

  if (/[A-Z]/.test(formValues.password) === false) {
    errors.password.push("Password must contain an uppercase letter");
  }

  if (/\d/.test(formValues.password) === false) {
    errors.password.push("\n\nPassword must contain a number");
  }

  // .title && .description because that's the name we gave our fields
  return errors;
};

export default reduxForm({
  form: "benshadaForm",
  validate
})(BenshadaForm);
