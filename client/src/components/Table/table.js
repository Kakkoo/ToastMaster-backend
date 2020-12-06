import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Addnames } from "../../actions/authActions";

class addnames extends Component {
  constructor() {
    super();
    //local state of the component
    this.state = {
      meetingID: "",
      name: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const participants = {
      meetingID: this.state.meetingID,
      name: this.state.name,
    };

    this.props.Addnames(participants);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/table");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/table");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="meetingID">
        <div className="container align-items-center mx-auto col-lg-6">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 id="toastmaster" className="display-4 text-center">
                TOASTMASTER : Add participants....
              </h1>
              {/* <p className="lead text-center">
                <span className="lead text-muted">Log In to Connexion </span>
              </p> */}

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="meetingID"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.meetingID,
                    })}
                    placeholder="MeetingID"
                    name="meetingID"
                    value={this.state.meetingID}
                    onChange={this.onChange}
                  />
                  {errors.meetingID && (
                    <div className="invalid-feedback">{errors.meetingID}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="name"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="container mx-auto d-flex justify-content-around align-items-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg btn-light bg-light btn-outline-dark align-self-center p-3 col-5"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

addnames.propTypes = {
  Addnames: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { Addnames })(addnames);
