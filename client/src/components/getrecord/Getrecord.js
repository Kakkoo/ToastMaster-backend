import React, { Component } from "react";
import classnames from "classnames";

import {
  LineChart,
  Line,
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
      email: "",

      loading: true,
      person: null,
      Data: null,
      Name: null,
      MeetingID: null,
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
    // this.state.person = names;
    // this.state.loading = false;
    this.setState({ person: names, loading: false });

    // const URL = "./api/main/allMeetingIDs";
    // const Response = await fetch(URL);
    // const Data = await Response.json();
    // this.setState({ Meeting: Data, loading: false });
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
    const emailData = {
      email: this.state.email,
      Data: this.state.Data,
    }
    if (emailData.email === "") {
      axios
        .post(`/api/main/getRecord`, participant)
        .then((res) => {
          const DD = res.data;
          console.log(DD);
          let nname = DD[0].name;

          this.setState({ Name: nname });
          this.setState({ Data: DD });
        })
        .catch((err) => console.log(err));
    }
    if(emailData.email !== "")
    {
       axios
         .post(`/api/main/sendemail`, emailData)
         .then((res) => {
           res.json();
         })
         .catch((err) => console.log(err));
    }
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
              <LineChart
                width={1000}
                height={500}
                data={this.state.Data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="meetingID" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ah"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="um" stroke="#82ca9d" />
                <Line type="monotone" dataKey="so" stroke="#00FFFF" />
                <Line type="monotone" dataKey="but" stroke="#000000" />
                <Line type="monotone" dataKey="well" stroke="#FF00FF" />
                <Line type="monotone" dataKey="ok" stroke="#00FF00" />
                <Line type="monotone" dataKey="falseStart" stroke="#0000FF" />
                <Line
                  type="monotone"
                  dataKey="wordRepititor"
                  stroke="#FF0000"
                />
                <Line type="monotone" dataKey="other" stroke="#FFFF00" />
              </LineChart>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h2 className="display-5 text-center">
                      send data via email{" "}
                    </h2>
                    <p className="lead text-center"></p>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="eamil"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.email,
                            }
                          )}
                          placeholder="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                      />
                    </form>
                  </div>
                </div>
              </div>
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-5 text-center">Get graphical view </h2>
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

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetRecord;
