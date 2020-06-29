import React from 'react';
import '../../assets/css/imageupload.css';
import ContainerDimensions from 'react-container-dimensions';
import PropTypes from 'prop-types';
import Image from './Image.js';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onImageChange: PropTypes.func,
    store: PropTypes.object,
    type: PropTypes.string,
    user: PropTypes.object,
    imagePreviewUrl: PropTypes.string
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

    this.props.onImageChange(fd);
  };

  render() {
    const imagePreviewUrl = this.props.imagePreviewUrl || this.state.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      // $imagePreview = <img alt="upload" className="img-responsive" src={imagePreviewUrl} />;
      $imagePreview = <Image image={imagePreviewUrl} type={this.props.user ? 'user' : 'store'} />;
    } else {
      $imagePreview = (
        <Image
          image={
            (this.props.user && this.props.user.image) || (this.props.user && this.props.user.image)
          }
          size={5}
          type={this.props.type}
        />
      );
    }

    return (
      <ContainerDimensions>
        {({ height, width }) => (
          <div
            className="preview-component text-center v-align"
            style={{ height: height * 0.8, width }}
          >
            <form encType="multipart/form-data">
              <input
                className="file-input"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
                accept=".jpg,.jpeg,.png,.gif"
              />
              <button type="button" className="btn">
                {this.props.buttonValue}
              </button>
            </form>
            <div className="img-preview">{$imagePreview}</div>
          </div>
        )}
      </ContainerDimensions>
    );
  }
}

export default ImageUpload;
