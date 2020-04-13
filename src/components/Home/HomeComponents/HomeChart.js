import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import mainBackground from '../../../assets/images/mainBackground.jpeg';
import { Link } from 'react-router-dom';

const homeChart = props => {
    const WeatherDetails = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    justify-content: space-evenly;
    color:white; 
    background-color: rgba(255,255,255,0.3);
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    height: 360px;
    width:620px;
`
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;
    background-image:url(${props => props.img});
    background-size: cover;
`
const P = styled.p`
    margin:0;
    color:#ffffff;
    cursor:pointer;
    &:hover{
    color: #e0e0e0;
    transition: 0.4s all;
  }
`

    const humidityData = (number) => {

        if (props.status === 'ready') {
            const data = (props.weather.daily.data[number].humidity) * 100;
            return data
        }

    }
    const data = [
        { day: 'Monday', humidity: humidityData(0) },
        { day: 'Tuesday', humidity: humidityData(1) },
        { day: 'Wednesday', humidity: humidityData(2) },
        { day: 'Thursday', humidity: humidityData(3) },
        { day: 'Friday', humidity: humidityData(4) },
        { day: 'Saturday', humidity: humidityData(5) },
        { day: 'Sunday', humidity: humidityData(6) }
    ]
    return (
        <Container img={mainBackground}>
        <WeatherDetails>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="humidity" stroke="blue" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <Link to='/' style={{textDecoration: 'none'}}>
                <P>Back to previous page</P>
            </Link>
        </WeatherDetails>
        </Container>
    );

}

const mapStateToProps = state => {
    return {
        weather: state.currentWeather,
        status: state.loadStatus,
    }
}

export default connect(mapStateToProps)(homeChart);