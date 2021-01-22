import React, { Component } from "react";
import { Link } from "react-router-dom";

class settings extends Component {
  render() {
    return (
      <div className="settings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5">Settings</h1>
              <p className="lead text-muted">
                You can modify your toastmaster table here
              </p>
              <hr />
              <div className="btn-group mb-4" role="group">
                <Link to="/addnames" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1 dashboard-icon" />{" "}
                  Add Participants &nbsp;&nbsp;&nbsp;
                </Link>
              </div>

              <div className="btn-group mb-4" role="group">
                <Link to="/removename" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1 dashboard-icon" />{" "}
                  Remove Participants &nbsp;&nbsp;&nbsp;
                </Link>
              </div>
              <div className="btn-group mb-4" role="group">
                <Link to="/getrecord" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1 dashboard-icon" />{" "}
                  Get Record &nbsp;&nbsp;&nbsp;
                </Link>
              </div>
              <div className="btn-group mb-4" role="group">
                <Link to="/adaptiveCard" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1 dashboard-icon" />{" "}
                  Adaptive Card &nbsp;&nbsp;&nbsp;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default settings;
