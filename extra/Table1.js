import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import { PlusMinus } from "../client/src/actions/authActions";
import "./Table.css";
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
  state = {
    items: [],
    errorMessage: "",
  };
  componentDidMount() {
    axios
      .get("/api/main/allparticipants")
      .then((response) => this.setState({ items: response.data }))
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  }



  render() {
    const { errors } = this.state;
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false,
      },
      {
        Header: "User ID",
        accessor: "body",
        sortable: false,
        filterable: false,
      },
    ];
    return (
      <ReactTable
      columns={columns}
      data = {this.state.posts}
      >

      </ReactTable>
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
