import React from "react";

// Custom components
import Header from "../Header/Header.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  renderPage() {
    return <Header />;
  }

  renderHelp() {
    let { location, isSignedIn, user } = this.props;

    return isSignedIn === false
      ? this.renderPage()
      : {
          user: (
            <Redirect
              to={{
                pathname: "/role",
                state: { from: location }
              }}
            />
          )
        }[user && user.type] ||
          this.renderPage();
  }

  render() {
    return <>{this.renderHelp()}</>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user === null ? null : state.auth.user,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, {})(Home);
