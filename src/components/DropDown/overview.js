import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';
import WeatherIcon from "../weatherIcons.js";

class Overview extends Component {
    state = {

    }
    componentDidMount() {

    }

    render() {
        return (
            <>
                <MDBRow className="pt-4 overview"> {/*This component is for the overview section which consists of current time, weather, then also the dropdown component, which then contains the hourly sections (see dropdown.js) */}
                    <MDBCol size="6">{/*splitting overview into 2 columns, one for the data, one for the icon of current temperature */}
                        {
                            this.props.data.hourly[0] == undefined ? //important- has to check data has been passed through or on initital load it will be undefined and cause an error, this waits for props to update and only displays when data is available
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>         {/*load a spinner until data is fully loaded- bootstrap spinner */}
                                </div>

                                :   /* OR - depending on statement either code above will show or code below*/

                                <>
                                    <div className="overviewHeaderContainer">
                                        <h1 className="overviewHeader" >{Math.round(this.props.data.hourly[0].temperature)}</h1>{/*shows temperature of first hour in array as this would be now */}
                                        <h1 className="overviewHeader" >&#176;{this.props.data.celsius ? "C" : "F"}</h1>{/*conditional display of correct symbol */}
                                    </div>
                                    <p>{`${this.props.address}, ${this.props.date.toLocaleTimeString()}, ${this.props.date.toString().split(" ")[2]}`}</p> {/*extra information on location, time */}
                                </>
                        }

                    </MDBCol>
                    <MDBCol size="6"  >
                        {
                            this.props.data.hourly[0] == undefined ? /*same as above, waits for data to be passed through, prevent crash  */
                                <div>
                                </div>

                                :

                                <>
                                    <WeatherIcon iconName={this.props.data.hourly[0].weatherIcon} size="20vh"></WeatherIcon> {/*displaying icon using the icon component defined in weatherIcons.js */}
                                </>
                        }

                    </MDBCol>
                </MDBRow>
                <Dropdown data={this.props.data.hourly} celsius={this.props.data.celsius} /> {/* passing hourly info to dropdown for hourly forecast*/}

            </>
        );
    }
}

export default Overview;