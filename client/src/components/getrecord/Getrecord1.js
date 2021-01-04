import React, { Component } from "react";
import classnames from "classnames";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import axios from "axios";

class GetRecord extends Component {
  state = {
    loading: true,
    person: null,
    Meeting: null,
    Data: null,
    Name: null,
    MeetingID: null,
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
    const url = "./api/main/allparticipants";
    const response = await fetch(url);
    const data = await response.json();
    let names = [];
    for (let i = 0; i < data.length; i++) {
      names.push(data[i].name);
    }
    names = names.join(".......");
    this.setState({ person: names, loading: false });

    const URL = "./api/main/allMeetingIDs";
    const Response = await fetch(URL);
    const Data = await Response.json();
    this.setState({ Meeting: Data, loading: false });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const participant = {
      name: this.state.name,
      meetingID: this.state.meetingID,
    };
    axios
      .post(`/api/main/getRecord`, participant)
      .then((res) => {
        const DD = res.data;

        console.log(DD);
        let data = Object.keys(DD).map((Key) => {
          return {
            Key,
            value: DD[Key],
          };
        });
        let nname = data[0].value;
        let mmeetingID = data[1].value;
        this.setState({ Name: nname });
        this.setState({ MeetingID: mmeetingID });
        data.splice(0, 2);
        console.log(data);

        this.setState({ Data: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          {" "}
          {this.state.Data === null ? (
            <div></div>
          ) : (
            <div>
              <h2>{this.state.Name}</h2>
              <h3>{this.state.MeetingID}</h3>
              <BarChart width={1000} height={400} data={this.state.Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis datakey="Key" />

                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          )}
        </div>
        <div>{this.state.DD}</div>{" "}
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
        <div id="DATA"></div>
        <div id="meet"></div>
        <div id="name"></div>
        <div id="ah"></div>
        <div id="um"></div>
        <div id="so"></div>
        <div id="but"></div>
        <div id="well"></div>
        <div id="ok"></div>
        <div id="false"></div>
        <div id="word"></div>
        <div id="other"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 text-center">Get Records</h2>
              <p className="lead text-center"></p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="name"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="meetingID"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.meetingID,
                    })}
                    placeholder="meetingID"
                    name="meetingID"
                    value={this.state.meetingID}
                    onChange={this.onChange}
                  />
                  {errors.meetingID && (
                    <div className="invalid-feedback">{errors.meetingID}</div>
                  )}
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

//const mapStateToProps = (state) => ({});
export default GetRecord;
//export default connect(mapStateToProps
// , {Getrecords}
//)(GetRecord);
