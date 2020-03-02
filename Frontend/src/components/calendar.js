import React, { Component } from "react";
import "../App.css";

import { Table } from "react-bootstrap";
import InternshipsForMonth from './internshipsFoMonth';
import SideBar from "./sideBar";

class Calendar extends Component {

    constructor() {
        super();

        this.state = {
            name: 'React',
            showPopup: false,
            changedInternship: "",
            showButtonAccept: true,
        };
    }

    render() {

        return (
            <div>
                <SideBar/>
                <Table  >
                    <tbody>
                        <tr  className="classMonth">
                            <td style={{background:"rgb(204, 224, 255)",border: "1px solid black"}}>Januar</td>
                            <td style={{background:"rgb(204, 224, 255)", border: "1px solid black"}}>Februar</td>
                            <td style={{background:"rgb(204, 224, 255)",border: "1px solid black"}}>Mart</td>
                        </tr>
                        <tr className="classTec">
                            <td ><InternshipsForMonth month="1" /></td>
                            <td ><InternshipsForMonth month="2" /></td>
                            <td><InternshipsForMonth month="3" /></td>
                        </tr>
                        <tr className="classMonth">
                            <td style={{background:"rgb(204, 224, 255)"}}>April</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>May</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>Jun</td>
                        </tr>
                        <tr className="classTec">
                            <td><InternshipsForMonth month="4" /></td>
                            <td><InternshipsForMonth month="5" /></td>
                            <td><InternshipsForMonth month="6" /></td>
                        </tr>
                        <tr className="classMonth">
                            <td style={{background:"rgb(204, 224, 255)"}}>July</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>August</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>September</td>
                        </tr>
                        <tr className="classTec">
                            <td><InternshipsForMonth month="7" /></td>
                            <td><InternshipsForMonth month="8" /></td>
                            <td><InternshipsForMonth month="9" /></td>
                        </tr>
                        <tr className="classMonth">
                            <td style={{background:"rgb(204, 224, 255)"}}>October</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>November</td>
                            <td style={{background:"rgb(204, 224, 255)"}}>December</td>
                        </tr>
                        <tr className="classTec">
                            <td><InternshipsForMonth month="10" /></td>
                            <td><InternshipsForMonth month="11" /></td>
                            <td><InternshipsForMonth month="12" /></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Calendar;