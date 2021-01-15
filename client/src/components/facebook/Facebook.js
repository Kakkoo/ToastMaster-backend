import React, { Component } from "react";
import FacebookLoginBtn from "react-facebook-login";
//import setAuthToken from "../../utils/setAuthToken";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Fregister} from "../../actions/authActions";
class LoginFacebook extends Component {
  state = {
    auth: false,
    name: "",
    avatar: "",
    email: "",
    id: "",
    accessToken: "",
    signedRequest: "",
    userID: "",
  };
  componentClicked = () => {
    console.log("Facebook btn clicked");
  };
  responseFacebook = (response) => {
    console.log(response);

    if (response.status !== "unknown") {
      this.setState({
        auth: true,
        name: response.name,
        avatar: response.picture.data.url,
        email: response.email,
        id: response.id,
        accessToken: response.accessToken,
        signedRequest: response.signedRequest,
        userID: response.userID,
      });
      const newUser = {
        name: this.state.name,
        avatar: this.state.avatar,
        email: this.state.email,
        accessToken: this.state.accessToken,
        signedRequest: this.state.signedRequest,
        userID: this.state.userID,
      };
      this.props.Fregister(newUser);
    }
  };
  //  componentWillUnmount() {
  //    //set token to auth header
    
  //    if (this.state.accessToken) {
  //      const token = this.state.accessToken;
  //       localStorage.setItem("jwtToken", token);
  //       setAuthToken(token);
  //      this.props.history.push("/table");
  //    }
  //  }
 componentWillReceiveProps(nextProps) {
   
   if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/table");
   }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
 }

  render() {
    let facebookData;

    this.state.auth
      ? (facebookData = (
          <div>
            <img
              src={this.state.avatar}
              width="200px"
              height="500px"
              alt={this.state.name}
            />
            <h2>Welcome {this.state.name}</h2>
          </div>
        ))
      : (facebookData = (
          <FacebookLoginBtn
            appId="662615397775220"
            autoLoad={true}
            fields="name,picture,email"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        ));
    return <>{facebookData}</>;
  }
}
LoginFacebook.propTypes = {
  Fregister: PropTypes.func.isRequired,
  //errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { Fregister })(LoginFacebook);
//export default LoginFacebook;


