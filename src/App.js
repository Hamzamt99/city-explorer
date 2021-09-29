import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false,
      showError: false
    }
  }

  getLoc = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value
    })

    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

      let locResult = await axios.get(url);
      this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true,
        showError:false
      })
    } catch {
      console.log('something went wrong')
      this.setState({
        showError: true,
        showLocInfo:false
      })
    }


  }


  render() {
    return (
      <div>
        <h3>City Explorer</h3>
        <form onSubmit={this.getLoc} >
          <input type="text" name='city' />
          <input type="submit" value='Explore' />
        </form>

        {this.state.showLocInfo &&
          <>
            <p>City name: {this.state.searchQuery}</p>
            <p>lat: {this.state.locationResult.lat}</p>
            <p>lon: {this.state.locationResult.lon} </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />

          </>
        }

        {this.state.showError &&
          <p>Something went wrong in getting location data</p>
        }



      </div>
    )
  }
}

export default App;