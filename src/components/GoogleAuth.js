import React from "react";
import { connect } from "react-redux";
import {
  onAuthChange,
  googleOAuth,
  googleSignIn,
  googleSignOut,
  signIn
} from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    if (this.props.loggedOut === true) {
      this.props.googleOAuth();
    }
  }

  onSignInClick = e => {
    e.preventDefault();
    this.props.oAuth.signIn();
  };

  onSignOutClick = e => {
    e.preventDefault();
    this.props.oAuth.signOut();
  };

  onResignInClick = async e => {
    e.preventDefault();
    await this.props.oAuth.signOut();
    this.props.oAuth.signIn();
    this.props.oAuth.isSignedIn.listen(this.props.onAuthChange);
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <>
          <p className="my-2">continue as</p>
          <button
            onClick={e => {
              e.preventDefault();
              this.props.signIn();
            }}
            className="btn btn-primary w-100 border border-dark mb-2"
            style={{ padding: "7px 10px", cursor: "pointer" }}
          >
            <i className="fab fa-google mr-2" />
            {this.props.userName}
          </button>

          <p className="my-2">or login with another account</p>
          <button
            onClick={this.onResignInClick}
            className="btn btn-primary border border-dark rounded-circle grow mb-2"
            style={{ padding: "7px 10px", cursor: "pointer" }}
          >
            <i className="fab fa-google grow" />
          </button>
        </>
      );
    } else if (this.props.isSignedIn) {
      return (
        <>
          <p className="my-2">continuing as ...</p>
          <button
            onClick={e => {
              e.preventDefault();
              this.props.signIn();
            }}
            className="btn btn-primary w-100 border border-dark mb-2"
            style={{ padding: "7px 10px", cursor: "pointer" }}
          >
            <i className="fab fa-google mr-2" />
            {this.props.userName}
          </button>
        </>
      );
    } else {
      return (
        <>
          <p className="my-2">or continue with</p>
          <button
            onClick={this.onSignInClick}
            className="btn btn-primary border border-dark rounded-circle grow mb-2"
            style={{ padding: "7px 10px", cursor: "pointer" }}
          >
            <i className="fab fa-google grow" />
          </button>
        </>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    oAuth: state.auth.oAuth,
    isSignedIn: state.auth.isSignedIn,
    userName: state.auth.name,
    loggedOut: state.auth.loggedOut
  };
};

export default connect(
  mapStateToProps,
  { onAuthChange, googleOAuth, googleSignIn, googleSignOut, signIn }
)(GoogleAuth);
