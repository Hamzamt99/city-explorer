import React, { Component } from 'react'
import axios from 'axios'

export class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          weatherDataInfo: []
    
        }
      }
      getWeatherInfo = async () => {
        let url = `localhost:3001/getWeater?searchQuery=Amman `;
        console.log(url);
        let weatherData = await axios.get(url);
        console.log(weatherData);
        this.setState({
          weatherDataInfo: weatherData.data

        })
        console.log(this.state.weatherDataInfo);
      }
    render() {
        return (
            
        <div>
        <button onClick={this.getWeatherInfo}>get weather</button>
        <p>{this.state.weatherDataInfo.name}</p>
        </div>
            
        )
    }
}

export default main