import React, { useState } from "react";
import cloud from "../image/clouds.png"
import rain from "../image/rain.png"
import clear from "../image/clear.png"
import mist from "../image/mist.png"
import err from "../image/warning.png"

const Myapp = ()=>{
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState("");

    const API_KEY = "fa97963f61c8b5253a2575dbbd9d2fee"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

    const handleInput = (event)=>{
        setSearch(event.target.value)
        console.log(event.target.value);
    }

    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        const jsonData = await get.json()
        console.log(jsonData);
        setData(jsonData);

        if(search == ""){
            // alert("Enter city name")
            setError("Please Enter City, Country Name")
        }
        else if(jsonData.cod == '404'){
            setError("Please Enter Valid Name !")
        }
        else{
            setError("")
        }
        setSearch("")
    }
    
    return(
        <>
        <div className="container">
            <div className="inputs">
                <input type="text" placeholder="Enter City, Country" value={search} onChange={handleInput} />
                <button onClick={myFun}>Search</button>
            </div>

            <div>
                {
                    error ? 
                    <div className="errorPage">
                        <p>{error}</p>
                        <img src={err} alt="" />
                    </div> : ""
                }
                {
                    data && data.weather ?
                    <div className="weathers">
                        <h2 className="cityName">{data.name}</h2>
                        <img src={data.weather[0].main == "Clouds" ? cloud : ""} />
                        <img src={data.weather[0].main == "Rain" ? rain : ""} />
                        <img src={data.weather[0].main == "Clear" ? clear : ""} />
                        <img src={data.weather[0].main == "Mist" ? mist : ""} />
                        <img src={data.weather[0].main == "Haze" ? cloud : ""} />
                        <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
                        <p className="climate">{data.weather[0].description}</p>
                    </div> :""
                }
            </div>
        </div>
        </>
    )
}
export default Myapp;