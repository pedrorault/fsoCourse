import React, {useState, useEffect} from 'react';
import axios from 'axios';


const SearchField = ({searchField,setSearch}) => {
  const handleSearch = (event)=> {
    setSearch(event.target.value)
  }
  return(
    <>
    Find Countries: <input value={searchField} onChange={handleSearch}/>
    </>
  )
}
const Results = ({allCountries,searchField}) => {
  if(searchField === ''){ return null }
  const filterIncludedCountries =  (country) => country.name.toLowerCase().includes(searchField.toLowerCase())
  const searched = allCountries.filter(filterIncludedCountries)
  const lenSearched = searched.length
  if(lenSearched === 0){
    return(<p>No country found</p>)
  }else if(lenSearched === 1){    
    return(
      <div>
        {searched.map((country,i)=>(
          <div key={i}>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
              {country.languages.map((lang,i)=><li key={i}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name+' Flag'} height={100} width={150}/>
          </div>
        ))}
      </div>
    )   
  }else if(lenSearched > 0 &&  lenSearched < 11){
    return (
      <div>
        {searched.map((country,i)=>(
          <p key={i}>{country.name}</p>
        ))}
      </div>
    )  
  }else{
    return(<p>Too many matches, specify another filter</p>)
  }
  
}
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
      <Results {...{allCountries,searchField}} />
    </div>
  )
}

export default App;
