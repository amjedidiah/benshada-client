import React from 'react';
import '../../assets/css/imageupload.css';
import ContainerDimensions from 'react-container-dimensions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Image from './Image.js';
import { userUpdate } from '../../redux/actions/users.js';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  static propTypes = {
    userUpdate: PropTypes.func,
    user: PropTypes.object
  };

  handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append('image', file);

    this.props
      .userUpdate(this.props.user.email, fd)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => this.setState(this.INIT));
  };

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="upload" className="img-responsive" src={imagePreviewUrl} />;
    } else {
      $imagePreview = <Image image={this.props.user && this.props.user.image} size={6} type="user" xtraClass="pt-2" />;
    }

    return (
      <ContainerDimensions>
        {({ height, width }) => (
          <div
            className="preview-component text-center v-align"
            style={{ height: height * 0.8, width }}
          >
            <form encType="multipart/form-data" >
              <input
                className="file-input"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
                accept=".jpg,.jpeg,.png,.gif"
              />
              <button type="button" className="btn">
                Change
              </button>
            </form>
            <div className="img-preview">{$imagePreview}</div>
          </div>
        )}
      </ContainerDimensions>
    );
  }
}

export default connect(null, { userUpdate })(ImageUpload);
