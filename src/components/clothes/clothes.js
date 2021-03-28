import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';
import codes from './clothes.json'
import ClothesIcon from "./clothesIcons";
import Suggest from '../suggestions/suggestion';
import Chart from "../Chart/Chart";

class Clothes extends Component {

state = {
    selection:[], //where we will store the selection of clothese determined by the logic
    rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain","Showers", "Mostly cloudy w/ showers", "Partly sunny w/ showers", "Rain and snow", "Partly cloudy w/ showers"],
    //these are the descriptions which correspond to rain so we will use these to determine if its raining as this part of our logic for deciding clothes
    hourly:[],
    isFlipped: false
}

componentDidUpdate(prevProps){ //this function is called whenever props or state update and so when the api data if passed through, once it is all there, props will update and this function is invoked
    if (this.props.hourly[0] !== prevProps.hourly[0]) //this ensure there is an actual change, otherwise we get stuck in an infinite loop and it crashes
    {
        const hour=this.props.hourly[0].time.getHours() //time of day
        const temp=this.props.celsius? this.props.hourly[0].temperature: (this.props.hourly[0].temperature - 32)* 5/9 //ensures temperate is in celsius (consistent format which logic below is based on)
        const isRaining= this.state.rainOption.includes(this.props.hourly[0].weatherDesc)

        if (Math.round(temp) <= 15 ) //checks if it is cold or very cold
        {
            if (Math.round(temp) <= 5 ) //very cold (doesnt check for rain as it will suggest a coat anyway)
            {
                this.setState({selection:["coat","hoodie","jeans","gloves"]})
            }
            else
            {
                if (isRaining ) // just cold but not very cold AND raining
                {
                    this.setState({selection:["raincoat","hoodie","jeans","trainers"]})
                }
                else //just cold AND not raining
                {
                    this.setState({selection:["hoodie","jeans","scarf"]})
                }
            }
        }
        else
        {
            const hour = this.props.hourly[0].time.getHours() //time of day
            const temp = this.props.celsius ? this.props.hourly[0].temperature : (this.props.hourly[0].temperature - 32) * 5 / 9 //ensures temperate is in celsius (consistent format which logic below is based on)
            const isRaining = this.state.rainOption.includes(this.props.hourly[0].weatherDesc)

            if (Math.round(temp) <= 15) //checks if it is cold or very cold
            {
                if (Math.round(temp) <= 5) //very cold (doesnt check for rain as it will suggest a coat anyway)
                {
                    this.setState({ selection: ["coat", "hoodie", "jeans", "gloves"] })
                }
                else {
                    if (isRaining) // just cold but not very cold AND raining
                    {
                        this.setState({ selection: ["raincoat", "hoodie", "jeans", "trainers"] })
                    }
                    else //just cold AND not raining
                    {
                        this.setState({ selection: ["hoodie", "jeans", "scarf"] })
                    }

                }
            }

            else //warm or hot AND NOT raining
            {
                if ( Math.round(temp) >= 26 ) //hot and not raining
                {
                    if (Math.round(temp) >= 26) // hot and raining
                    {
                        this.setState({ selection: ["umbrella", "T-shirt", "shorts/skirt", "trainers"] })
                    }
                    else // warm and raining
                    {
                        if (Math.round(temp) >= 21) {
                            this.setState({ selection: ["raincoat", "T-shirt", "joggers", "trainers"] })
                        }
                        else {
                            this.setState({ selection: ["raincoat", "hoodie", "joggers", "trainers"] })
                        }

                    }


                }

                else //warm or hot AND NOT raining
                {
                    if (Math.round(temp) >= 26) //hot and not raining
                    {
                        if (hour >= 8 && hour < 19) //during the day
                        {
                            this.setState({ selection: ["T-shirt", "shorts/skirt", "sunglasses", "cap"] })
                        }
                        else //night
                        {
                            this.setState({ selection: ["T-shirt", "shorts/skirt", "trainers"] })
                        }

                    }
                    else //warm and not raining
                    {
                        if (Math.round(temp) >= 21) {
                            if (hour >= 8 && hour < 19) //during the day
                            {
                                this.setState({ selection: ["T-shirt", "joggers", "cap"] })
                            }
                            else //night
                            {
                                this.setState({ selection: ["T-shirt", "joggers", "trainers"] })
                            }

                        }
                        else {
                            if (hour >= 8 && hour < 19) //during the day
                            {
                                this.setState({ selection: ["hoodie", "joggers", "cap"] })
                            }
                            else //night
                            {
                                this.setState({ selection: ["hoodie", "joggers", "trainers"] })
                            }
                        }

                    }
                }
            }
        }
    }
}

    render() {
        return (
            <>
                <h1 id="clothesHead">Suggestion for the day</h1>
                <Suggest hourly={this.props.hourly} celsius={this.props.celsius} rainSummary={this.props.minutely.summary}/>
                {/* a bootstrap layout component that breaks the layout up into responsive rows and columns */}
                <div className="flip-card" onClick={() => this.setState({isFlipped: !this.state.isFlipped})}>
                    <div className="flip-card-inner">
                        <div className={`flip-card-front z-depth-1 ${this.state.isFlipped ? "flipped" : ""}`}>
                            <MDBRow id="clothes">
                                {
                                    this.state.selection.map((item) => {//map function loops through our selection array (each item of clothing)
                                        return (
                                            <MDBCol size="6" className="flex-center flex-column">
                                                <ClothesIcon iconName={codes[item]} size="10vh" /> {/*for each item we have a icon component, we first map the selection name to the icon name which is stored as in a json file */}
                                                <p>{item.toUpperCase()}</p>{/* displays the name of the clothing in capital letters */}
                                            </MDBCol>
                                        )
                                    })
                                }
                            </MDBRow>
                        </div>
                        <div className={`flip-card-back z-depth-1 ${this.state.isFlipped ? "flipped" : ""}`}>
                            <Chart rainSummary={this.props.minutely.summary} data={this.props.minutely.map((item) => {
                                return (item.intensity)
                            })}/>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className="menu button" onClick={() => this.setState({isFlipped: false})}>
                        Overview
                    </div>
                    <div className="menu button" onClick={() => this.setState({isFlipped: true})}>
                        Rain-Chart
                    </div>
                    <div className="menu rate">
                        <div>
                            Up
                        </div>
                        <div>
                            Down
                        </div>
                    </div>
                </div>
                <hr />
            </>
        );
    }
}

export default Clothes;
