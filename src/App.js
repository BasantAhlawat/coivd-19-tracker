// https://covid-19-tracker-2d2c4.web.app/

import React,{useEffect, useState} from 'react';
import {MenuItem,FormControl,Select,Card,CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from "./InfoBox.js";
import Map from "./Map";
import Table from "./Table"
import {sortData,PrettyPrintStat} from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"


function App() {


  const [countries,setCoutries] = useState([]);
  const [tableData,setTableData] = useState([]);
  // holds the value of selected country
  const [country,setCountry] = useState("worldwide");
  // store data of active country info
  const [countryInfo,setCountryInfo] = useState({});
  const [zoom,setMapZoom]= useState(3);
  const [center,setMapCenter]= useState({lat: 34.80746, lng: -40.4796});
  const [mapCountries,setMapCountries] = useState();
  const [casesType,setCasesType] = useState("cases");


  useEffect( () => {
    
    const getCountryData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        // restructuring countries data 
        const countries= data.map((country) =>({
          name: country.country,
          value: country.countryInfo.iso3,
          cases: country.cases
        }));
        setMapCountries(data);
        setCoutries(countries);
        const sortedData=sortData(data);
        setTableData(sortedData);
        console.log("mapCountries ---->>>",mapCountries);
      });

    };
    getCountryData();

  },[]);

  // to load initial data for worldwide 
  useEffect( () => {
    fetch ("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then( (data) => {
      setCountry("worldwide")
      setCountryInfo(data)
      
    });
    // eslint-disable-next-line 
  },[]);
  
  const onCountryChange = async (event) =>{
    const countryCode=event.target.value;
    

    // set selected country info
    const url = countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((response)=> response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long});
        setMapZoom(5);
      })
      
      console.log("countryinfo->>>> ",countryInfo);
      console.log("countries->>>> ",countries);
      console.log("country->>>> ",country);

  };

  


  return (
    <div className="app">

    <div className="app__left">
      {/* Header */}
    <div className="app__header">
      <h1>COVID 19 Tracker</h1>

      <FormControl className="app__dropdown"> 
         <Select variant="outlined" onChange={onCountryChange} value={country} > {/* holds the value of selected country */}
        <MenuItem value="worldwide" >Worldwide</MenuItem>
          {countries.map( (country) => (
              <MenuItem value={country.value} >{country.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      
    </div>
      {/* 3 blocks of data about selected country */}
      <div class="app__info">
        <InfoBox 
          onClick={e => setCasesType("cases")}
          active={casesType === "cases"}
          title="Coronavirus Cases" 
          cases={PrettyPrintStat(countryInfo.todayCases)} 
          total={PrettyPrintStat(countryInfo.cases)}
        />
        <InfoBox
          onClick={e => setCasesType("recovered")}
          active={casesType === "recovered"}
          isRecovered={casesType === "recovered"}
          title="Recovered"
          cases={PrettyPrintStat(countryInfo.todayRecovered)}
          total={PrettyPrintStat(countryInfo.recovered)}
          />
        <InfoBox
          onClick={e => setCasesType("deaths")}
          active={casesType === "deaths"}
          title="Deaths" 
          cases={PrettyPrintStat(countryInfo.todayDeaths)} 
          total={PrettyPrintStat(countryInfo.deaths)}
          />
      </div>

       {/* Map  */}
       <Map countries={mapCountries} casesType={casesType} center={center} zoom={zoom} />

    </div>
    <div className="app__right">
    <Card >
        {/* Top Rankings of Country Table */}
        <CardContent>
        <h2>Live cases ranking of Counties</h2>
        <Table countries={tableData}  />
        {/* Graph */}
        <h2>Worldwide new {casesType}</h2>
        <LineGraph  className="app__graph" casesType={casesType} />
        </CardContent>

    </Card>
    </div>
     

    </div>
  );
}

export default App;
