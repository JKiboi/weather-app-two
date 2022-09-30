
import React from "react";
import "./descriptions.css";

import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import {FiSunrise, FiSunset} from "react-icons/fi"
import { BiHappy } from "react-icons/bi";
import {TbWorldLongitude} from "react-icons/tb"
import { MdCompress, MdOutlineWaterDrop, MdVisibility } from "react-icons/md";

const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  let unix_timestamp_one = weather.sunrise;
  var date = new Date(unix_timestamp_one * 1000);
  var hour = date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  var formattedTime = hour + ':' + minute.substr(-2) + ':' + second.substr(-2); 

  let unix_timestamp_two = weather.sunset;
  var date = new Date(unix_timestamp_one * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTimeTwo = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); 

  
  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
    {
      id:7,
    icon:<MdVisibility/>,
    title:"visibility",
    data:weather.visibility/1000,
    unit:"m",
    },
    {
      id:8,
    icon:<FiSunrise/>,
    title:"sunrise",
    data:formattedTime,
    unit:"am"
    
    },
    {
      id:9,
    icon:<FiSunset/>,
    title:"sunset",
    data:formattedTimeTwo,
    unit:"pm"
    
    },

    {
      id:10,
    icon:<TbWorldLongitude/>,
    title:"longitude",
    data:weather.lon.toFixed(),
    unit:"deg",
    },
    
  ];
  return (
    <div className="section section__descriptions">
      {cards.map(({id, icon, title, data, unit}) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;