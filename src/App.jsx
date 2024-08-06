import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState({}); // Corrected initial state to an object
  const [celcius, setCelcius] = useState(0);
  const [search, setSearch] = useState("Delhi");
  const [abc, setabc] = useState("");
  const [speed, setSpeed] = useState(0);
  const [success, setSuccess] = useState(true);

  
  


  const fetchApi = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86856c224025fcb26aa13fd58b7bcfbd`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const weatherData = {
          humidity: data.main.humidity,
          temp: data.main.temp,
          speed: data.wind.speed
        };

        const cel = weatherData.temp - 273.15;
        const formatted = Number(cel).toFixed(0);

        const sp = weatherData.speed * 3.6;
        const formatted2 = Number(sp).toFixed(0);

        setCelcius(formatted);
        setSpeed(formatted2);
        setWeather(weatherData);
        setSuccess(true);
      } else {
        setSuccess(false);
        console.log('Error found:', data.message);
      }
    } catch (error) {
      setSuccess(false);
      console.log('Error found:', error);
    }
  };

  useEffect(() => {
    if (search !== "") {
      fetchApi(search);
      
    }
  }, [search]);

  function handleInput(e) {
    setabc(e.target.value);
  }

  function searchDone() {
    if (abc !== "") {
      setSearch(abc);
      setabc("");
    } else {
      alert("Enter a valid city name");
    }
  }

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="searchbar">
            <input
              className='search'
              placeholder='Search'
              type='text'
              value={abc}
              onChange={handleInput}
            />
            <img
              className='search-icon'
              src='./images/magnifying-glass.png'
              alt="Search Icon"
              onClick={searchDone}
            />
          </div>
          <div className="main">
            <img className='cloud' src='./images/cloudy.png' alt="Cloudy" />
            <div className="temp">{celcius}°C</div>
            <div className='cityname'>{search}</div>
          </div>
          <div className='footer'>
            <div className="first">
              <img className='wind' src='./images/weather.png' alt="Weather" />
              <div className="content">{weather.humidity}%<br />Humidity</div>
            </div>
            <div className="second">
              <img className='wind' src='./images/wind.png' alt="Wind" />
              <div className="content">{speed} km/hr<br />Wind Speed</div>
            </div>
          </div>
        </div>

       {/* <div className='developer'>Developed by Prashant Pal</div> */}
      </div>
    </>
  );
}

export default App;
