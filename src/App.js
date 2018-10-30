import React from "react";
import Form from "./components/Form";
import Titles from "./components/Titles";
import Weather from "./components/Weather";

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const API_KEY = "0402500425321548d2244f701aae1aba";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`)
      .then((res) => {       
        if(res.status === 200) {
          return res.json();
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Please enter correct city name and country name. Ex: New York, US"
          });
        }
      })
      .then(responseData => {    //responseData function
        if(city && country) {
          this.setState({          //update the state object array
            temperature: responseData.main.temp,
            city: responseData.name,
            country: responseData.sys.country,
            humidity: responseData.main.humidity,
            description: responseData.weather[0].description,
            error: ""
          });
        } else {
          
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });  //error function
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
