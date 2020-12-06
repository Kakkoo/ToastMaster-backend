import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddParticipants } from "../../actions/authActions";

class participants extends Component {
  constructor() {
    super();
    //local state of the component
    this.state = {
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
      name: this.state.name,
    };

    this.props.AddParticipants(participants);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/addnames");
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
      <div className="login">
        <div className="container align-items-center mx-auto col-lg-6">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 id="Addnames" className="display-4 text-center">
                Add Participant
              </h1>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="name"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Participant"
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

participants.propTypes = {
  participants: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { AddParticipants })(participants);
