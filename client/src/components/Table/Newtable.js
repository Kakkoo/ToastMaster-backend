import React, { Component } from "react";

export default class Newtable extends Component {
  state = {
    loading: true,
  };
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
  render() {
    return (
      <div>
        {this.state.loading ? <div>loading...</div> : <div>person..</div>}
      </div>
    );
  }
}
