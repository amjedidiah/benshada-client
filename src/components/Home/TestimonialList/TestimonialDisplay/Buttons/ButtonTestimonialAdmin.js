import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { testimonialDelete } from '../../../../../redux/actions/testimonials.js';

class ButtonTestimonialAdmin extends React.Component {
  static propTypes = {
    testimonial: PropTypes.object,
    testimonialDelete: PropTypes.func
  };

  render = () => {
    const { _id } = this.props.testimonial;
    return (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target="#testimonialDelete">
          <FontAwesomeIcon icon={faTrash} />
        </span>

        {/* Modal */}

        <div
          className="modal fade"
          id="testimonialDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Testimonial</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this testimonial?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props
                    .testimonialDelete(_id)
                    .catch((err) => toast.error(
                      (err
                            && err.response
                            && err.response.data
                            && err.response.data.message
                            && err.response.data.message.name)
                            || (err && err.response && err.response.statusText)
                            || 'Network error'
                    ))
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default connect(null, { testimonialDelete })(ButtonTestimonialAdmin);
