import React, { Component } from "react";

export default class Newtable extends Component {
  state = {
    loading: true,
    person: null
  };
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({person: data[0], loading: false});
    //console.log(data[0].name);
  }
  render() {
    return (
      <div>
        {this.state.loading || !this.state.person ? (
          <div>loading...</div>
        ) : (
          <div>
            <div>{this.state.person.name}</div>
            <div>{this.state.person.user}</div>
            <div>{this.state.person.date}</div>
            <div>{this.state.person._id}</div>
            </div>
        )}
      </div>
    );
  }
}
