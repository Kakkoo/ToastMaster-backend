import React, { Component } from "react";
import "./Table.css";
import { connect } from "react-redux";
import { addPlusCount } from "../../actions/authActions";
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
      date: Date(),
    };
    this.onChange = this.onChange.bind(this);
    //this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  plusClicked(plusData, e) {
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
              meetingID: this.state.meetingID,
            })}
          >
            {ah}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ah",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {AH}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "um",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {um}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "um",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {UM}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "so",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {so}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "so",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {SO}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "but",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {but}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "but",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {BUT}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "well",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {well}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "well",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {WELL}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ok",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {ok}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "ok",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {OK}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "falseStart",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {falseStart}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "falseStart",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {FALSESTART}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "wordRepititor",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {wordRepititor}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "wordRepititor",
              count: -1,
              meetingID: this.state.meetingID,
            })}
          >
            {WORDREPITITOR}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "other",
              count: 1,
              meetingID: this.state.meetingID,
            })}
          >
            {other}
          </td>
          <td
            onClick={this.plusClicked.bind(this, {
              name: `${name}`,
              fillerWord: "other",
              count: -1,
              meetingID: this.state.meetingID,
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
                  <td>
                    <form noValidate>
                      <div className="form-group">
                        <input
                          type="meetingID"
                          placeholder="Meeting ID"
                          name="meetingID"
                          value={this.state.meetingID}
                          onChange={this.onChange}
                        />
                      </div>
                    </form>
                  </td>
                  {/* <td id="meetingID">{this.state.date}</td> */}
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
Newtable.propTypes = {
  // addPlusCount: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //errors: state.errors,
  //auth: state.auth,
});

export default connect(mapStateToProps, { addPlusCount })(Newtable);
