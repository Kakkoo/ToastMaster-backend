import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class ChangeAvatar extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      avatar: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      avatar: this.state.avatar,
    };

    axios
      .post("/api/users/changeAvatar", user)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="changeAvatar">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Change avatar </h1>
              <p className="lead text-center">
                change avatar of your Toast-master account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="String"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Avatar"
                    name="avatar"
                    value={this.state.avatar}
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

export default ChangeAvatar;
