import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item nav">
          <Link className="nav-link" to="/register" id="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item nav">
          <Link className="nav-link" to="/login" id="nav-link2">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item nav">
          <Link
            className="nav-link d-md-block "
            to="/settings"
            id="nav-link"
            data-toggle="tooltip"
            title="Account Settings"
          >
            <i className="fa fa-cog">Settings</i>
          </Link>
        </li>
        <li className="nav-item nav">
          <Link
            className="nav-link"
            to="/table"
            id="nav-img"
            data-toggle="tooltip"
            title="Your Profile"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "1.5em" }}
            />
          </Link>
        </li>
        <li className="nav-item nav">
          <button
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link btn bg-transparent outline-transparent"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/table">
            Toastmasters
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(navbar);
