import React, { Component } from "react";
import "../App.css";
import baseUrl from "../enviroment";

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {

    if (this.state.value.trim() === "") {
      alert("Username connot be empty!");
    } else {
      fetch(baseUrl + "login/" + this.state.value)
        .then(response => response.json())
        .then(data => {
          if (!data.title && data.title != "NotFound") {
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);
            localStorage.setItem('technology', data.technology.name);
            this.props.history.push("/calendar");
          } else {
            alert("Bad username!");
          }
        });
    }
  }
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  render() {
    return (
      <div className="welcome">

        <div class="image"></div>
        <h1 >INTERNSHIP CALENDAR</h1>
        <h3>Username:</h3>
        <input
          type="text"
          className="inputUsername"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className="btnLogin" onClick={this.handleClick}>Login</button>
      </div>
    );
  }
}

export default Welcome;