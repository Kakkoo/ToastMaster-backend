import React, { Component } from "react";

import { connect } from "react-redux";
import { Getrecords } from "../../actions/authActions";

class GetRecord extends Component {
  state = {
    loading: true,
    person: null,
    Meeting: null,
  };
  constructor() {
    super();
    //local state of the component
    this.state = {
      name: "",
      meetingID: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    const url = "http://localhost:8000/api/main/allparticipants";
    const response = await fetch(url);
    const data = await response.json();
    let names = [];
    for (let i = 0; i < data.length; i++) {
      names.push(data[i].name);
    }
    names = names.join(".......");
    this.setState({ person: names, loading: false });
    const URL = "http://localhost:8000/api/main/allMeetingIDs";
    const Response = await fetch(URL);
    const Data = await Response.json();
    // let meetingIDs = [];
    // for (let i = 0; i < Data.length; i++) {
    //   meetingIDs.push(Data[i].name);
    // }
    // meetingIDs = meetingIDs.join(".......");
    this.setState({ Meeting: Data, loading: false });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.meetingID]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const participant = {
      name: this.state.name,
      meetingID: this.state.meetingID,
    };

    this.props.Getrecords(participant);
  }
  render() {
    return (
      <div>
        {" "}
        {this.state.loading || !this.state.person ? (
          <div>loading...</div>
        ) : (
          <div>
            <h4>{this.state.person}</h4>
          </div>
        )}
        <div>
          {" "}
          {this.state.loading || !this.state.Meeting ? (
            <div>loading...</div>
          ) : (
            <div>
              <h4>{this.state.Meeting}</h4>
            </div>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 text-center">Get Records</h2>
              <p className="lead text-center"></p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="name"
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <input
                    type="meetingID"
                    placeholder="meetingID"
                    name="meetingID"
                    value={this.state.meetingID}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GetRecord.propTypes = {
  //GetRecord: PropTypes.func.isRequired,
  //errors: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  // errors: state.errors,
  //auth: state.auth,
});

export default connect(mapStateToProps, { Getrecords })(GetRecord);
