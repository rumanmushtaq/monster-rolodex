// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=685b8fd8ec039e7b828947b52a55fc54
import React, { useEffect, useState } from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temperature = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [Tempinfo, setTempinfo] = useState({});
  const getData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=685b8fd8ec039e7b828947b52a55fc54`;

      let res = await fetch(url);
      let data = await res.json();
      console.log();
      console.log(data);
      const { main: weathermood } = data.weather[0];
      const { temp, pressure, humidity } = data.main;
      const { speed } = data.wind;
      const { name } = data;
      const { country, sunset } = data.sys;
      const newWeatherList = {
        weathermood,
        temp,
        pressure,
        humidity,
        speed,
        name,
        country,
        sunset,
      };
      setTempinfo(newWeatherList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getData}>
            Search
          </button>
        </div>
      </div>
      <Weathercard Tempinfo={Tempinfo} />
    </>
  );
};

export default Temperature;
