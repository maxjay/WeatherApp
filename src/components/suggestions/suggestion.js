import React, { Component } from "react";
import './suggestion.css';
import { MDBIcon } from 'mdbreact';
import Chart from "../Chart/Chart";

class Suggest extends Component{
  constructor(props){
    super(props);
    this.state = {
      selection:[],
      hourly:[],
      addRain:""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hourly[0] !== prevProps.hourly[0])
    {
      if (Math.round(this.props.hourly[0].temperature) >= 30) {
        this.setState({selection:["Bring some sunglasses"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 25) {
        this.setState({selection:["Might want a sun hat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 20) {
        this.setState({selection:["wear a T-shirt"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 15) {
        this.setState({selection:["Grab a jacket"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 10) {
        this.setState({selection:["Wear a jumper"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 5) {
        this.setState({selection:["Don't forget a scarf"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 0) {
        this.setState({selection:["Might want a wooly hat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= -5) {
        this.setState({selection:["Grab a coat"]});
      } else if (Math.round(this.props.hourly[0].temperature) < -5) {
        this.setState({selection:["Wear a snowsuit"]});
      } else {
        this.setState({selection:["Wear a hoodie"]});
      }
      if (this.props.hourly[0].weatherDesc.includes("rain")){
        this.setState({addRain:"and bring an umbrella"});
      } else {
        this.setState({addRain:""});
      }
    }
    }

  render(){
    return(
      <div id='main'>
        <div id='swap' className="flip-container flip"> 
          <button id='flip'><MDBIcon icon="exchange-alt" size="lg" /></button>
          <div id='text' className="flip-front">
            Hello
            {this.state.selection} {this.state.addRain}
          </div>
          <div id="chart" className="flip-back">
            <Chart data={this.props.minutely}/>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

export default Suggest;
