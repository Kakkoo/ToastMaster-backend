import Axios from "axios";
import { response } from "express";
import React, { Component } from "react";
import "./Table.css";
class Newtable extends Component {
  constructor() {
    super();
    this.state = {
      fillerwords: {
        AH: "aa",
        UM: "um",
        SO: "hm",
        BUT: "tthis",
        WELL: "that",
        OK: "ok",
        FALSE_START: "falseStart",
        WORD_REPITITOR: "word_repititor",
        OTHER: "other",
      },
      person: [],
    };
  }
  //  setState = {
  //     loading: true,
  //     person: null
  //   };
  renderTableHeader() {
    let header = Object.keys(this.state.fillerwords);
    return header.map((key, index) => {
      return <th key={index}>{key} </th>;
    });
  }
  renderTableData() {
    let body = Object.keys(this.state.person);
    return body.map((key, index) => {
      return <td key={index}>{key} </td>;
    });
  }

  async componentDidMount() {
    // const url = "http://localhost:8000/api/main/allparticipants";
    // const R = await fetch(url);
    // const DATA = await R.json();
    // console.log(DATA);
    // this.setstate.person = DATA;
    //this.State({ person: DATA, loading: false });
    Axios.get("http://localhost:8000/api/main/allparticipants")
    .then(response => response.data)
    .then((data)=> {this.setState({person: data});
  });
    
  }
  render() {
    return (
      <div>
        <h1 id="title">Toast Master Table</h1>
        <table id="students">
          <tbody>
            <tr>
              <td id="meetingID">{Date()}</td>
              {this.renderTableHeader()}
            </tr>
            {this.renderTableData()}
            <tr>
            {this.state.person.length}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Newtable;
