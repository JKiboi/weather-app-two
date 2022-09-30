import React,{useEffect, useState} from "react";
import coldBg from "./assets/cold6.jpg";
import hotBg from "./assets/hot5.jpg";
import Descriptions from "./components/Descriptions";
import {getFormattedWeatherData} from "./weatherService"


function App() {
  const [weather,setWeather]=useState(null)
  const [units,setUnits]=useState("metric")
  const [city,setCity]=useState("Nairobi")
  const [bg,setBg]=useState(hotBg)

  useEffect(()=>{
    const fetchWeatherData=async()=>{
      const data=await getFormattedWeatherData(city,units);
          setWeather(data);
          //dynamic bg
          const threshhold=units==="metric"? 25:77;
          if(data.temp<=threshhold){
            setBg(coldBg)
          }else{
            setBg(hotBg)
          }
      }
    fetchWeatherData();
  },[units,city])

  const handleClickUnit=(e)=>{
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)

    const isCelsius = currentUnit === "C"
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius ? "metric" : "imperial")
  }
  const enterKeyPressed=(e)=>{
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();

     }
  }
  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {weather && (
        <div className="container">
        <div className="section section__inputs">
          <input
            onKeyDown={(e)=>enterKeyPressed(e)}
            type="text"
            name="city"
            placeholder="Enter city"
          />
          <button onClick={handleClickUnit}>°F</button>
        </div>
        <div className="section section__temperature">
          <div className="icon">
            <h3>{`${weather.name},${weather.country}`} </h3>
            <img 
            src={weather.iconURL}
            alt="weatherIcon"/>
            <h3>{weather.description}</h3>
          </div>
          <div className="temperature">
            <h1>{`${weather.temp.toFixed()}°${units==="metric" ? "C" : "F" }`}</h1>
          </div>
          </div>
          {/*Bottom description */}
          <Descriptions weather={weather} units={units}/>

      </div>
        )}
      </div>
    </div>
  );
}

export default App;
