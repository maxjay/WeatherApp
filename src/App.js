import './App.css';
import Background from './components/Background/Background';
import {getHourForecastClimaCell, getMinuteData, getMinuteDataMicrosoft, getDailyDataMicrosoft,getHourDataMicrosoft, convertTZ, getDayForecastClimaCell, getOpenWeatherData } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import TopBar from './components/TopBar'
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothes';
import Suggest from './components/suggestions/suggestion';
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,
            lon: -0.1277583,
            address: "London, UK",
            date: new Date(),
            hourly: [],
            minutely: [],
            daily: [],
            //settings variables
            bookmark:{},
            darkMode:false,
            timePm:false,
            celsius: true,
            kmh: false,
            api: "microsoft",
            timezone: "Europe/London",
            data: ""
        }
    }


    setSettings(newSettings) {
        console.log("APP: NEW SETTINGS: ", newSettings);
        if (newSettings.hasOwnProperty("daily")) {
            if (this.state.celsius) {
                this.setState({daily: newSettings.daily});
            } else {
                this.setState({daily: newSettings.daily.map((item) => {
                    item.temperature = (9/5*item.temperature)+32;
                    return item;
                })});
            }
        }
        if (newSettings.hasOwnProperty("hourly")) {
            if (this.state.celsius) {
                this.setState({hourly: newSettings.hourly});
            } else {
                this.setState({hourly: newSettings.hourly.map((item) => {
                    item.temperature = (9/5*item.temperature)+32;
                    return item;
                })});
            }
        }
        this.setState(newSettings, function() {
            if (newSettings.hasOwnProperty("lat")) {
                this.fetchData();
            }
            if (newSettings.hasOwnProperty("celsius")) {
                this.convertTemperatureToggle();
            }
        });
    }


    convertTemperatureToggle() {
        this.setState({hourly: this.state.hourly.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32;
            return (item)
        })});
        this.setState({daily: this.state.daily.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32;
            return (item)
        })});
    }

    fetchData() { //fetches api data
        console.log("APP: FETCHING NEW DATA");
        if (this.state.api == "openweather") { //checks which api provider is selected in state and uses that to get the relevant weather data
            getOpenWeatherData(this.state, this.setSettings.bind(this)); //gets all data required and as it is binded, it will update the state of this component with the new data
        } else if (this.state.api == "climacell") {
            getHourForecastClimaCell(this.state, this.setSettings.bind(this));
            getMinuteData(this.state, this.setSettings.bind(this));
            getDayForecastClimaCell(this.state, this.setSettings.bind(this));
        } else if (this.state.api == "microsoft") {
            getMinuteDataMicrosoft(this.state, this.setSettings.bind(this)); 
            getHourDataMicrosoft(this.state, this.setSettings.bind(this)); 
            getDailyDataMicrosoft(this.state, this.setSettings.bind(this));
        }
        console.log(this.state.hourly);
    }

    componentDidMount(){//when components first loads it will fetch the weather data
        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
    }

    componentWillUnmount() {
        console.log("APP: UPDATED");
    }

    //Reuse existing method pls
    handleCallback = (childData) =>{
      this.setState({data: childData})
    }

    render() {
        return (
            <div className="App"> {/* Here we display the different components and pass through the required api data */}
                <Background date={this.state.date} timeZone={this.state.timezone}/>
                <TopBar setSettings={this.setSettings.bind(this)} data={this.state} setBookmark={this.setBookmark.bind(this)} removeBookmark={this.removeBookmark.bind(this)}/>
                <Overview data={this.state}/>
                <Suggest hourly={this.state.hourly}/> 
                <Clothes hourly={this.state.hourly}/>
<<<<<<< HEAD
                <Daily data={this.state.daily} celsius={this.state.celsius}/>
=======
                <Daily data={this.state.daily} celsius={this.state.celsius}/>{/* celcius will tell us what unit of measure we need to use */}
>>>>>>> 7d224f279d9c2e04b562a1a50f6ca6db98af2d51
            </div>
        )
    }
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 7d224f279d9c2e04b562a1a50f6ca6db98af2d51
