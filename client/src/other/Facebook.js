import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

import FacebookLoginBtn from "react-facebook-login";

 class LoginFacebook extends Component {
  state = {
    auth: false,
    name: "",
    picture: "",
  };
  componentClicked = () => {
    console.log("Facebook btn clicked");
  };
  responseFacebook = (response) => {
    console.log(response);
    if (response.status !== "unknown"){
     const newUser =  this.setState({
        auth: true,
        name: response.name,
        email: response.email,
        avatar: response.picture.data.url,
        password: 123456,
        password2: 123456
      });
       axios
         .post("/api/users/register", newUser)
         .then((res) => console.log(res.data))
         .catch((err) => this.setState({ errors: err.response.data }));
    }
        };
  render() {
    
    let facebookData;

    this.state.auth
      ? (facebookData = (
          <div>
            <img src={this.state.picture} alt={this.state.name} />
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
export default LoginFacebook;
