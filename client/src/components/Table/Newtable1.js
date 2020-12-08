import React, { Component } from "react";
import "./Table.css";
class Newtable extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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
      person: null,
    };
  }
  renderTableHeader() {
    let header = Object.keys(this.state.fillerwords);
    return header.map((key, index) => {
      return (
        <th colSpan={2}  key={index}>
          {key}{" "}
        </th>
      );
    });
  }
  renderTableData() {
    return this.state.person.map((person, index) => {
      const { name, ah, um, so, but, well, ok, falseStart } = person; //destructuring
      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{ah}</td>
          <td>{um}</td>
          <td>{so}</td>
          <td>{but}</td>
          <td>{well}</td>
          <td>{ok}</td>
          <td>{falseStart}</td>
        </tr>
      );
    });
  }
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const Response = await fetch(url);
    const DATA = await Response.json();
    this.setState({ person: DATA, loading: false });
  }
  render() {
    return (
      <div>
        {this.state.loading || !this.state.person ? (
          <div>TABLE...</div>
        ) : (
          <div>
            {" "}
            <h1 id="title">Toast Master Table</h1>
            <table id="students">
              <tbody>
                <tr>
                  <td id="meetingID">
                    {Date()}
                  </td>
                  {this.renderTableHeader()}
                </tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
export default Newtable;
