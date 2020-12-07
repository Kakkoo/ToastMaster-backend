import React, { Component } from "react";
import ReactTable from "react-table";

export default class Newtable extends Component {
  state = {
    loading: true,
    person: []
  };
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const response = await fetch(url);
    const DATA = await response.data;
    console.log(DATA);
    this.setState({ person: DATA, loading: false });
  }
  render() {
     const columns = [
       {
         Header: "Name",
         accessor: "name",
       },
       {
         Header: "False Start",
         accessor: "falseStart",
       },
       {
         Header: "OK",
         accessor: "ok",
       },
       {
         Header: "Well",
         accessor: "well",
       },
       {
         Header: "But",
         accessor: "but",
       },
       {
         Header: "So",
         accessor: "so",
       },
       {
         Header: "Um",
         accessor: "um",
       },
       {
         Header: "Ah",
         accessor: "ah",
       },
     ];
    return (
      <div>
        {this.state.loading || !this.state.person ? (
          <div>loading...</div>
        ) : (
          <div>
            <ReactTable columns={columns} data={this.state.person}></ReactTable>
            <div>{this.state.person.name}</div>
            <div>{this.state.person._id}</div>
          </div>
        )}
      </div>
    );
  }
}
