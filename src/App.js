import React,{useEffect, useState} from 'react'
import { BsSearch } from "react-icons/bs";

const App = () => {
  const [weather,setWeather] = useState('');
  const [location,setLocation] = useState('Chennai');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},in&appid=3347adae554746284383ba2d4a7ccb5e&units=metric`
  const searchLocation = () => {
    fetch(url).then((resp)=>{
      if(resp.status >=200 && resp.status <300){
        return resp.json();
      }else if(resp.status===404){
        alert('please enter correct location')
        throw new Error('Error finding location')

      }
      else{
        throw new Error('Error Fetching Data')
      }
    }).then((currentWeather)=>{
      setWeather(currentWeather);
    }).catch((error)=>console.log(error));
  };
  useEffect(()=>{
    searchLocation();
  },[])

  const submitHandler = (e)=>{
    e.preventDefault();
    searchLocation();
  
  }
  return (
    <main><div className="container" >
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <input 
          type="text"
          placeholder='Search Location'
          id='location'
          name='location'
          value={location}
          onChange={(e)=>setLocation(e.target.value)} />
      </div>
      <button type='submit'><BsSearch/></button>
    </form>
    <section className="weather">
      <div className="location">
      <h4>{weather?.name}</h4>
      </div>
      <div className="temp">
      <h1>{weather.main?.temp}°C</h1>
      </div>
      <div className="description">
      <div className="feels-like">
          <p>{weather.main?.feels_like}°C</p>
          <p>Feels like</p>
        </div>
        <div className="humidity">
          <p>{weather.main?.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind-speed">
          <p>{weather.wind?.speed}m/s</p>
          <p>Wind Speed</p>
        </div>
        
        <p></p>
      </div>
      
    </section>
  </div></main>
    
  )
}

export default App