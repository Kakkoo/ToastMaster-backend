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
  minusClicked(e) {
    e.preventDefault();
    const minusData = {
      meetingID: this.state.meetingID,
      name: this.state.name,
      fillerWord: this.state.fillerWord,
      count: this.state.count,
    };
    this.props.addMinusCount(minusData, this.props.history);
    alert("- Clicked");
  }
  plusClicked( plusData, e) {
    e.preventDefault();
    
    this.props.addPlusCount(plusData, this.props.history);
    alert("+ Clicked");
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
              name: "how to get value here",
              fillerWord: "ah",
              count: 1,
            })}
          >
            {ah}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "ah",
              count: -1,
            })}
          >
            {AH}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "um",
              count: 1,
            })}
          >
            {um}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "um",
              count: -1,
            })}
          >
            {UM}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "so",
              count: 1,
            })}
          >
            {so}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "so",
              count: -1,
            })}
          >
            {SO}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "but",
              count: 1,
            })}
          >
            {but}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "but",
              count: -1,
            })}
          >
            {BUT}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "well",
              count: 1,
            })}
          >
            {well}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "well",
              count: -1,
            })}
          >
            {WELL}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "ok",
              count: 1,
            })}
          >
            {ok}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "ok",
              count: -1,
            })}
          >
            {OK}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "falseStart",
              count: 1,
            })}
          >
            {falseStart}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "falseStart",
              count: -1,
            })}
          >
            {FALSESTART}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "wordRepititor",
              count: 1,
            })}
          >
            {wordRepititor}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "wordRepititor",
              count: -1,
            })}
          >
            {WORDREPITITOR}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "other",
              count: 1,
            })}
          >
            {other}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: "HOW",
              fillerWord: "other",
              count: -1,
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
                  <td id="meetingID">{Date()}</td>
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
