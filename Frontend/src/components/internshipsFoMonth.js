import React from 'react';
import baseUrl from "../enviroment.js";
import Popup from "../components/popup";
import "./internshipsForMonth.css";

class InternshipsForMonth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            internships: [],
            showPopup: false,
            changedInternship: "",
            showButtonAccept: true,
            showButtonReserve:false
        };

        fetch(baseUrl + 'internship/' + this.props.month)
            .then(response => response.json())
            .then(data => {
                this.setState({ internships: data });
            });

    };
    
    showPopup(internship) {

        this.setState({ showPopup: true });

        this.setState({ changedInternship: internship });

        if (localStorage["role"]=="2" && localStorage["technology"] === internship.technology.name) {
            this.setState({ showButtonAccept: true });
        }else{
            this.setState({ showButtonAccept: false });
        }

        if(localStorage["role"] === "0" || localStorage["role"] === "1"){
            this.setState({showButtonReserve:true});
          }
    }

    closePopup() {
        window.location.reload();
        this.setState({ showPopup: false });
    }

    getData(mentorName) {

        fetch(baseUrl + 'internship/addMentor/' + mentorName, {
            method: 'PUT',
            body: JSON.stringify(this.state.changedInternship),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
    }

    render() {

        const tecnology = Object.keys(this.state.internships).map((key) => (
            <div>
                <button
                    style={{ color: this.state.internships[key].technology.color }}
                    className="btn"
                    onClick={this.showPopup.bind(this, this.state.internships[key])}
                    disabled={this.showButtonReserve}>
                    {!this.state.internships[key].mentor ? this.state.internships[key].technology.name :
                        this.state.internships[key].mentor.firstName + " " + this.state.internships[key].mentor.lastName}
                </button>
            </div>
        ));

        return (
            
            <div>{this.state.showPopup ?
                <Popup
                    internship={this.state.changedInternship}
                    showButtonAccept={this.state.showButtonAccept}
                    showButtonReserve={this.state.showButtonReserve}
                    closePopup={this.closePopup.bind(this)}
                    sendData={this.getData.bind(this)}
                />
                : null
            }{tecnology}
            </div>
        );
    }
}

export default InternshipsForMonth;

