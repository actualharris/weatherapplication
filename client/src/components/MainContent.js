import React from 'react';
import Forcast from './Forcast';

import '../components/MainContent.css';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.forcasts = [];
    this.state = { allForcasts: [], modified: false };
    this.handleClick = this.handleClick.bind(this);
    this.renderForcast = this.renderForcast.bind(this);
  }

  // A function that extracts data from a raw forcast and returns 
  // an object that contains the city name, the time and a 6-elements array
  // that contains a 6-days forecast details. 
  // These details to be handed down to a <Forcast /> component.  
  createForcast = (forcast) => {
    const city = forcast.city;
    const time_now = forcast.time_now;
    let forcastDays = [];

    for (let i = 0; i < forcast.consolidated_weather.length; i++) {
      const date_of_forcast = forcast.consolidated_weather[i].applicable_date;
      const max_temp = Math.round(forcast.consolidated_weather[i].max_temp);
      const min_temp = Math.round(forcast.consolidated_weather[i].min_temp);
      const now_temp = i === 0 ? Math.round(forcast.consolidated_weather[i].the_temp) : '';
      const weather_state_name = forcast.consolidated_weather[i].weather_state_name;
      const weather_state_abbr = forcast.consolidated_weather[i].weather_state_abbr;

      forcastDays.push({ date_of_forcast, max_temp, min_temp, now_temp, weather_state_name, weather_state_abbr });
    }

    return { city, time_now, forcastDays };
  }

  createForcastComponent = (data) => {
    return (<Forcast key={Math.floor(Math.random() * 100)} city={data.city} time={data.time_now} forcastDays={data.forcastDays} />)
  }

  renderForcast() {

    let components = [];
    for (let i = 0; i < this.state.allForcasts.length; i++) {
      let forcastProps = this.createForcast(this.state.allForcasts[i]);

      components.push(this.createForcastComponent(forcastProps));
    }

    return components;
  }

  // componentDidMount() {
  //   if(this.forcasts.length > 3)
  //   {
  //     this.forcasts.shift();            
  //   }
  //   this.setState({allForcasts: this.forcasts});
  // }

  handleClick(event) {
    // event.preventDefault();

    let el = document.querySelector("input[type='text']");
    if (el.value === '')
      return;

    let locName = el.value;

    console.log(locName);

    const url = `http://localhost:5000/forcasts/${locName}/`;
    fetch(url)
      .then(response => { return response.json(); })
      .then(data => {
        // console.log("Data from server: ", data);           

        const date = new Date();
        const time_now = date.getHours() + ':' + date.getMinutes();

        this.forcasts.push({ city: locName, time_now, consolidated_weather: data.consolidated_weather });

        if (this.forcasts.length > 3) {
          this.forcasts.shift();
        }

        this.setState({ allForcasts: this.forcasts });
        // console.log("this.state: ", this.state.allForcasts)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("this.state.allForcasts: ", this.state.allForcasts);
    const allComponents = this.renderForcast();
    return (
      <div>
        <div>
          <input className="text_input" type="text" name="search" placeholder="Search for location" />
          <button className="button" type="button" name="button" value="getWeather" onClick={this.handleClick}>Get Weather</button>
        </div>
        <div className="all-forcasts">
          {(this.state.allForcasts === undefined || this.state.allForcasts.length < 1) && (<h3>No forecasts to show</h3>)}
          {(this.state.allForcasts && this.state.allForcasts.length >= 1) && (allComponents.map(item => { return item; }))}
        </div>
      </div>
    );
  }
}

export default MainContent;
