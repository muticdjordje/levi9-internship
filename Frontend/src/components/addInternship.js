import React, { Component } from "react";
import "./addInternship.css"
import baseUrl from "../enviroment.js";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class AddInternship extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'React',
            technologies: [],
            selectedDay: undefined,
            technology: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);

        fetch(baseUrl + 'technology')
            .then(response => response.json())
            .then(data => {
                this.setState({ technologies: data });
            });
    }

    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    handleChange(event) {
        this.setState({ technology: event.target.value });
    }

    handleSubmit(event) {

        fetch(baseUrl + 'internship', {
            method: 'POST',
            body: JSON.stringify(
                {
                    technology: JSON.parse(this.state.technology),
                    mentor: null,
                    date: this.state.selectedDay,
                }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())

       
    }

    handleBack(){
        let path = `/calendar`;
        this.props.history.push(path);
        window.location.reload();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add new internship</h2>
                <form name="form">
                    <div className={'form-group'}>
                        <label htmlFor="technology"> Technology </label>
                        <select className="form-control input" name="technology" value={this.state.technology} onChange={this.handleChange} >
                            <option>Choose your option</option>
                            {this.state.technologies.map((tech) =>
                                <option key={tech} value={JSON.stringify(tech)}>{tech.name}</option>)}
                        </select>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="date">Date</label>
                        <div className="input">
                            <DayPickerInput className="DayPicker" 
                                            inputProps={{ style: { width: 930} }} 
                                            name="date" 
                                            dateFormat="YYYY-MM-DDThh:mm:ss" 
                                            onDayChange={this.handleDayChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <button onClick={this.handleSubmit} className="button5">ADD</button>
                        <button onClick={this.handleBack} className="button6">BACK</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddInternship;