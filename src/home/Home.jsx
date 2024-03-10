import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { data } from "../cities";

const Home = () => {
  const [city, setCity] = useState("");
  const [lang, setLang] = useState(0);
  const [lats, setLats] = useState(0);
  const [result, setResult] = useState("");
  const changeCity = (e) => {
    const newCity = e.target.value;
    const selectedCity = data.find((item) => item.name === newCity);
    if (selectedCity) {
      setCity(newCity);
      setLats(selectedCity.lat);
      setLang(selectedCity.lng);
    }
  };

  useEffect(() => {
    const toggleWeather = async () => {
      //fetching data using another api
      //   let data = await fetch(
      //     `https://api.openweathermap.org/data/2.5/weather?lat=${lang}&lon=${lats}&appid=${"1c5fd0a96d9b367378ffb0f838210bd8"}`
      //   );
      //   data = await data.json();
      //   console.log(data);
      //   setResult(data.main);

      let data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${"922a611948244b738ef03309241003"}&q=${city}`
      );
      data = await data.json();
      setResult(data.current);
    };
    toggleWeather();
  }, [city]);

  return (
    <div className="home1">
      <div className="home">
        <h1>Welcome to the Weather App</h1>
        <select onChange={changeCity}>
          {data.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {city === "" ? (
          <h2>Select your city to find out the weather</h2>
        ) : (
          <h2>Showing weather for {city}</h2>
        )}
        {result?.condition?.text && (
          <p>
            Weather is {result.condition.text} in {city}
          </p>
        )}
        {city !== "" && <p>Current Temperature is {result?.temp_c}° Celcius</p>}
        {city !== "" && <p>Feels Like {result?.feelslike_c}° Celcius</p>}
      </div>
    </div>
  );
};

export default Home;
