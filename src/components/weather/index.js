import React, { useEffect, useState } from 'react';
import axios  from 'axios'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import './styles.css'



export default function Weather() {

    const [data, setData] = useState({
        celcius : '',
        name : 'Weather Forecast',
        humidity: '',
        speed : '',
        image :''
    })

    const[name,setName] = useState('');

    const[error,setError] = useState('');

    const handleClick = () => {
        if(name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1ba51ab0f6a4b976e29578b08f5f90fe&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let source= '';
                if(res.data.weather[0].main == "Clouds"){
                   source = `${cloud_icon}`
                } else if (res.data.weather[0].main === "Clear"){
                    source = `${clear_icon}`
                } else if (res.data.weather[0].main === "Rain"){
                    source =`${rain_icon}`
                } else if (res.data.weather[0].main === "Drizzle"){
                    source = `${drizzle_icon}`
                } else if (res.data.weather[0].main === "Snow"){
                    source = `${snow_icon}`
                }
                else {
                    source = `${clear_icon}`  
                }
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity,
                speed: res.data.wind.speed, image: source })
                setError('');
            })
            .catch(err => {
                if(err.response.status == 404 ){
                    setError("Invalid City Name")
                } else {
                    setError('');
                }
            });
        }
    }

    return(
     <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter Country/City Name' onChange={e => setName(e.target.value)}/>
                <button onClick={handleClick}><img src={search_icon} alt=''/></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt='' className='icon' />
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src={humidity_icon} alt='' />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                    <img src={wind_icon} alt='' />
                        <div className='wind'>
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
}