import React, { Component } from "react";
import "./Table.css";
import { connect } from "react-redux";
import {addPlusCount} from "../../actions/authActions";
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
      meetingID: "",
      name: "",
      fillerWord: "",
      count: null,
      date: Date()
    };
    //this.onClick = this.onClick.bind(this);
  }
  renderTableHeader() {
    let header = Object.keys(this.state.fillerwords);
    return header.map((key, index) => {
      return (
        <th colSpan={2} key={index}>
          {key}{" "}
        </th>
      );
    });
  }
  plusClicked( plusData, e) {
    e.preventDefault();
    
    this.props.addPlusCount(plusData, this.props.history);
    alert("Clicked");
  }
  renderTableData() {
    return this.state.person.map((person, index) => {
      const {
        name,
        ah,
        AH,
        um,
        UM,
        so,
        SO,
        but,
        BUT,
        well,
        WELL,
        ok,
        OK,
        falseStart,
        FALSESTART,
        wordRepititor,
        WORDREPITITOR,
        other,
        OTHER,
      } = person; //destructuring
      return (
        <tr key={name}>
          <td>{name}</td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ah",
              count: 1,
              date: Date(),
            })}
          >
            {ah}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ah",
              count: -1,
              date: Date(),
            })}
          >
            {AH}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "um",
              count: 1,
              date: Date(),
            })}
          >
            {um}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "um",
              count: -1,
              date: Date(),
            })}
          >
            {UM}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "so",
              count: 1,
              date: Date(),
            })}
          >
            {so}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "so",
              count: -1,
              date: Date(),
            })}
          >
            {SO}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "but",
              count: 1,
              date: Date(),
            })}
          >
            {but}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "but",
              count: -1,
              date: Date(),
            })}
          >
            {BUT}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "well",
              count: 1,
              date: Date(),
            })}
          >
            {well}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "well",
              count: -1,
              date: Date(),
            })}
          >
            {WELL}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ok",
              count: 1,
              date: Date(),
            })}
          >
            {ok}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ok",
              count: -1,
              date: Date(),
            })}
          >
            {OK}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "falseStart",
              count: 1,
              date: Date(),
            })}
          >
            {falseStart}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "falseStart",
              count: -1,
              date: Date(),
            })}
          >
            {FALSESTART}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "wordRepititor",
              count: 1,
              date: Date(),
            })}
          >
            {wordRepititor}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "wordRepititor",
              count: -1,
              date: Date(),
            })}
          >
            {WORDREPITITOR}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "other",
              count: 1,
              date: Date(),
            })}
          >
            {other}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "other",
              count: -1,
              date: Date(),
            })}
          >
            {OTHER}
          </td>
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
                  <td id="meetingID">{this.state.date}</td>
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
addPlusCount.propTypes = {
  // addPlusCount: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //errors: state.errors,
  //auth: state.auth,
});

export default connect(mapStateToProps, { addPlusCount })(Newtable);
