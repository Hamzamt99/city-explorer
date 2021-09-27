/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import axios from 'axios';

// https://city-explore-backend.herokuapp.com




class App extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      weatherDataInfo: {},
      setWeatherInfo: false,



    }
  }

  getLocFun = async (e) => {
    e.preventDefault();
    console.log(e.target.city.value);
    console.log('inside getLocFun')
    await this.setState({
      searchQuery: e.target.city.value
    })
    let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let locResult = await axios.get(reqUrl);


    this.setState({
      locationResult: locResult.data[0],
      showLocInfo: true
    })
  }

  getWeatherInfo = async () => {
    console.log(this.state.searchQuery);
    let url = `${process.env.REACT_APP_SERVER_LINK}/getWeater?searchQuery=${this.state.searchQuery}`;
    let weatherData = await axios.get(url);
    this.setState({
      weatherDataInfo: weatherData.data,
      setWeatherInfo: true,
    })
    console.log(this.state.weatherDataInfo);
    console.log(weatherData);
  }


  render() {
    return (
      <div>
        <h3>City Explorer app</h3>
        {/* <button onClick={this.getLocFun}>Get Location</button> */}
        <form onSubmit={this.getLocFun} >
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form>

        {this.state.showLocInfo &&
          <>
            <p>City name: {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResult.lat}</p>
            <p>longitude: {this.state.locationResult.lon} </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />

          </>

        }
        <button onClick={this.getWeatherInfo}>get weather</button>

        {this.state.setWeatherInfo &&
         
        
        <>
            
              {this.state.weatherDataInfo.map((iteam,index)=>{
                return(<div key={index}>
                  <p>{iteam.data}</p>
                  <p>{iteam.description}</p>
                </div>)
                
              }) }
            </>
        }
            </div>
            )
  }


}
            export default App;
