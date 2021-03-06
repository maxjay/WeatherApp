import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import '../DropDown/dropdown.css'
import './daily.css'
import { MDBAnimation } from "mdbreact";
import Card from '../DropDown/Card';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Daily extends Component {
    state = {
    }

    componentDidMount() {


    }

    render() {
        return (
            <div id="daily">
                <p>Next {this.props.data.length} days</p> {/* shows forecast for the amount of days ahead we have data for */}
                <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}> {/*bootsrap classes to make display felex and as a row */}
                    {
                        this.props.data.map(data => { /* loops through each element (each day) */
                            let day = days[data.time.getDay()]; //converting date to string
                            let temp = Math.round(data.temperature); //rounding temperature so easier to read
                            return (
                                <Card hour={day} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} />
                                /*card element is reused for daily and hourly as they should look the same, only difference for each card is here we pass through the day not the hour */
                            )
                        })
                    }
                </MDBContainer>
            </ div>
        );
    }
}

export default Daily;