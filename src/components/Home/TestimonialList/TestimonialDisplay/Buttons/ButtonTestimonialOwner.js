import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  testimonialDelete,
  testimonialUpdate,
  testimonialsOneSelected
} from '../../../../../redux/actions/testimonials.js';
import TestimonialForm from '../TestimonialForm.js';

class ButtonTestimonialOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Testimonial'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    testimonial: PropTypes.object,
    user: PropTypes.object,
    testimonialDelete: PropTypes.func,
    testimonialsOneSelected: PropTypes.func,
    testimonialUpdate: PropTypes.func
  };

  submit = ({
    _id,
    testimony
  }) => {
    this.setState({
      buttonValue: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const testimonial = {
      _id, testimony
    };

    Object.keys(testimonial).forEach((key) => {
      if (testimonial[key] === undefined) {
        delete testimonial[key];
      }
    });

    this.props.testimonialUpdate(_id, testimonial).catch((err) => {
      this.setState(this.INIT);
      toast.error(
        (err
          && err.response
          && err.response.data
          && err.response.data.message
          && err.response.data.message.name)
          || (err && err.response && err.response.statusText)
          || 'Network error'
      );
    });
  };

  render = () => (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target="#testimonialEdit">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => this.props.testimonialsOneSelected(this.props.testimonial)}
          />
        </span>

        {/* Modal */}
        <div
          className="modal fade"
          id="testimonialEdit"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <TestimonialForm
                  buttonValue={this.state.buttonValue}
                  onSubmit={this.submit}
                />
              </div>
            </div>
          </div>
        </div></>
  );
}

export default connect(null, { testimonialDelete, testimonialUpdate, testimonialsOneSelected })(
  ButtonTestimonialOwner
);
