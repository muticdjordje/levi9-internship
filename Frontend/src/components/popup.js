import React, { Component } from "react";
import { Table } from "react-bootstrap";
import './popup.css';
import dateFormat from 'dateformat';
import baseUrl from "../enviroment.js";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from "moment";

class Popup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'React',
      mentorsList: [],
      showReserveButton: false,
      selectedDay: {},
    };

    fetch(baseUrl + 'user/' + this.props.internship.technology.name)
      .then(response => response.json())
      .then(data => {
        this.setState({ mentorsList: data });
    });

    this.handleAccept = this.handleAccept.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);

  }

  handleDayChange(day) {

    this.setState({ selectedDay: day});

    const date = moment(day).format('YYYY-MM-DDThh:mm:ss');

    fetch(baseUrl + 'internship/updateDate/' + date, {
      method: 'PUT',
      body: JSON.stringify(
        {
          technology: this.props.internship.technology,
          mentor: this.props.internship.mentor,
          date: this.props.internship.date,
          newDate: day
        }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      this.props.closePopup();
    })
  }

  handleAccept() {

    fetch(baseUrl + 'internship/addMentor/' + localStorage["username"], {
      method: 'PUT',
      body: JSON.stringify(this.props.internship),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      this.props.closePopup();
    })
  }

  addMentor(username) {

    fetch(baseUrl + 'internship/addMentor/' + username, {
      method: 'PUT',
      body: JSON.stringify(this.props.internship),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      this.props.closePopup();
    });
  }

  render() {

    const mentors = Object.keys(this.state.mentorsList).map((key) => (
      <tr>
        <td>{this.state.mentorsList[key].firstName}</td>
        <td>{this.state.mentorsList[key].lastName}</td>
        <td>{this.state.mentorsList[key].email}</td>
        {this.props.showButtonReserve && <td><button className="buttonReserve" onClick={this.addMentor.bind(this, this.state.mentorsList[key].username)}> Reserve </button></td>}
      </tr>
    ));

    return (
      <div className='popup'>
        <div className='popup_inner'>
    <h1> {this.props.internship.technology.name} Internship</h1>
          <h1 className="date">{dateFormat(this.props.internship.date, "mmmm dS, yyyy")}</h1>
          {this.props.showButtonReserve && <div>
            <DayPickerInput inputProps={{ style: { width: 400 } }} className="DayPicker" onDayChange={this.handleDayChange} />
          </div>}      
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {this.props.showButtonReserve && <th></th>}
              </tr>
            </thead>
            <tbody>
              {mentors}
            </tbody>
          </Table>
          <div className="buttons">
            {this.props.showButtonAccept && <button className="btnAccept" onClick={this.handleAccept}> Reserve </button>}
            <button className="btnClose" onClick={this.props.closePopup}> Close </button>
          </div>
         
        </div>
      </div>
    );
  }
}

export default Popup;