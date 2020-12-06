import React, { Component } from "react";
import { Link } from "react-router-dom";
class landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Toast - Master</h1>
                <p className="lead">
                  {" "}
                  Do you want to practice public speaking, improve your
                  communication and build leadership skills? We are here o
                  help.t
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg btn-info mr-2"
                  id="register-link"
                >
                  Sign Up&nbsp;&nbsp;&nbsp;
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light"
                  id="login-link"
                >
                  Login
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link
                  to="/forgotPassword"
                  className="btn btn-lg btn-light"
                  id="forgot-password-link"
                >
                  ForgotPassword
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default landing;
