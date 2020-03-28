import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [searchField, setSearch] = useState('')
  const [allCountries,setAllCountries] = useState([])

  useEffect(()=>{
      axios.get("https://restcountries.eu/rest/v2/all")
           .then(response=>setAllCountries(response.data))
  },[])

  return (
    <div>
      <SearchField {...{searchField,setSearch}}/>
      <InfoCountries allCountries={allCountries} {...{searchField,setSearch}}/>
    </div>
  )
}
    
const SearchField = ({searchField,setSearch}) =>(<>Find Countries: <input value={searchField} onChange={(e) => setSearch(e.target.value) }/></>) 
    
const InfoCountries = ({allCountries,searchField,setSearch}) => {
  if(searchField === ''){ return null }
  const includedCountries = 
    allCountries.filter( (country) =>
      country.name.toLowerCase().includes(searchField.toLowerCase())
    )
  const len = includedCountries.length
  if(len === 0){
    return <p>No country found</p>
  }else if(len === 1){
    return(
      <Countries includedCountries={includedCountries} />
    )
  }else if (len > 0 && len <= 10){
    return( 
      <Countries includedCountries={includedCountries} setSearch={setSearch} />
    )
  }else{
    return <p>Too many matches, specify another filter</p>
  }
}
const Countries = ({includedCountries,setSearch}) => {
  if(includedCountries.length > 1){
    return(
      includedCountries.map((country,i)=>(
          <div key={i} style={{paddingBottom:"10px"}}>
            <p style={{display: 'inline', paddingRight:15+"px"}} >{country.name}</p>
            <button onClick={() => setSearch(country.name)}>Show</button>
          </div>
      ))
    )
  }else{
    return(
      <div>
        {includedCountries.map((country,i)=>(
          <div key={i}>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
              {country.languages.map((lang,i)=><li key={i}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name+' Flag'} height={100} width={150}/>
            <Weather capital={country.capital} country={country.alpha2Code}/>         
          </div>
        ))}
      </div>

    )
  }
}
const Weather = ({capital,country}) => {  
  const [weatherObj,setWeather]=useState({
    capital:null,
    temperature:null,
    image:{
        src:null,
        alt:null
    },
    wind: {
        speed:null
    }})
  useEffect(()=>{
    if(capital === '') {return}
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital},${country}&units=metric&appid=${api_key}`
    axios.get(url).then(resp=>{
      setWeather(
        { 
          capital:resp.data.name,
          temperature:resp.data.main.temp,
          image:{
            src:`http://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`,
           alt:resp.data.weather[0].description
          },
          wind: {
            speed:resp.data.wind.speed
          }
        }
      )
    })     
  },[capital,country])
  return(
    <div>
      <h3>Weather in {weatherObj.capital}</h3>
      <p><strong>Temperature: </strong>{parseInt(weatherObj.temperature)}°C</p>
      <img src={weatherObj.image.src} alt={weatherObj.image.alt}/>
      <p><strong>Wind: </strong>{weatherObj.wind.speed} mph</p>
    </div>
  )
}
export default App;