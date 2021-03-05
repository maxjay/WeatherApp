import logo from './logo.svg';
import './App.css';
import {getHourForecastClimaCell, getMinuteData, getDayForecastClimaCell } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import TopBar from './components/TopBar'
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothes';
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,
            lon: -0.1277583,
            address: "London, UK",
            celsius: true,
            date: new Date(),
            hourly: [],
            minutely: [{temperature: 0}],
            daily: [],
        }
    }

    setSettings(newSettings) {
        console.log("hello");
        this.setState(newSettings);
        //refresh data
        if (newSettings.hasOwnProperty("lat")) {
            console.log("Ran update");
            getHourForecastClimaCell(this.state, this.setSettings.bind(this));
            getMinuteData(this.state, this.setSettings.bind(this));
            getDayForecastClimaCell(this.state, this.setSettings.bind(this));
        }
    }
    componentDidMount(){
        getHourForecastClimaCell(this.state, this.setSettings.bind(this));
        getMinuteData(this.state, this.setSettings.bind(this));
        getDayForecastClimaCell(this.state, this.setSettings.bind(this));
    }
    
    render() {
        return (
            <div className="App">
                <TopBar/>
                <Overview data={this.state} date={this.state.date} address={this.state.address}/>
                <Clothes data={this.state} hourly={this.state.hourly}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>
            </div>
        )
    }
}


export default App;
