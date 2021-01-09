import React, { Component } from "react";
import FacebookLoginBtn from "react-facebook-login";
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
    }
  };

  render() {
    let facebookData;

    this.state.auth
      ?
       (facebookData = 
      (
          <div>
            <img
              src={this.state.avatar}
              width="200px"
              height="500px"
              alt={this.state.name}
            />
            <h2>Welcome {this.state.name}</h2>
          </div>
        )
        )
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

export default LoginFacebook;


