import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PlusMinus } from "../../actions/authActions";

class table extends Component {
  constructor() {
    super();
    //local state of the component
    this.state = {
     name: "",
     meetingID: "",
     fillerWord: "",
     count: "",
     errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      meetingID: this.state.meetingID,
      fillerWord: this.state.fillerWord,
      count: this.state.count,
    };

    this.props.PlusMinus(user);
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
    <div></div>
    );
  }
}

PlusMinus.propTypes = {
  PlusMinus: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { PlusMinus })(table);
