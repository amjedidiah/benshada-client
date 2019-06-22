import React from "react";
import { connect } from "react-redux";
import { googleSignIn, googleSignOut, signIn } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    if (navigator.onLine) {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: `671903564161-tcactt088s0u6ph0694egi81e53ibd3c.apps.googleusercontent.com`,
            scope: "email"
          })
          .then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
          });
      });
    }
  }

  onAuthChange = async isSignedIn => {
    if (isSignedIn) {
      await this.props.googleSignIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().w3.U3,
        this.auth.currentUser.get().w3.ig
      );
    } else {
      this.props.googleSignOut();
    }
  };

  onSignInClick = e => {
    e.preventDefault();
    this.auth.signIn();
  };

  onSignOutClick = e => {
    e.preventDefault();
    this.auth.signOut();
  };

  onResignInClick = async e => {
    e.preventDefault();
    await this.auth.signOut();
    this.auth.signIn();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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
    isSignedIn: state.auth.isSignedIn,
    userName: state.auth.name
  };
};

export default connect(
  mapStateToProps,
  { googleSignIn, googleSignOut, signIn }
)(GoogleAuth);
