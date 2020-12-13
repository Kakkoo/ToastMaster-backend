import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RemoveParticipants } from "../../actions/authActions";

class RParticipants extends Component {
  state = {
    loading: true,
    person: null,
  };
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
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const response = await fetch(url);
    const data = await response.json();
    let names = [];
    for (let i = 0; i < data.length; i++) {
      names.push(data[i].name);
    }
    names = names.join(".......");
    this.setState({ person: names, loading: false });
   
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const participants = {
      name: this.state.name,
    };

    this.props.RemoveParticipants(participants, this.props.history);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  render() {
    const { errors } = this.state;
    return (
      <div className="RemoveParticipants">
        <div>
          {this.state.loading || !this.state.person ? (
            <div>loading...</div>
          ) : (
            <div>
              <h4>{this.state.person}</h4>
            </div>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 text-center">Remove Participants</h2>
              <p className="lead text-center"></p>
              <form noValidate onSubmit={this.onSubmit}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RParticipants.propTypes = {
  RParticipants: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { RemoveParticipants })(
  RParticipants
);
