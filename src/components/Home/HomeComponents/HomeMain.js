import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import HomeSearch from './HomeSearch';
import * as weatherIcons from './WeatherIcons/Icons';
import HomeSlider from './HomeSlider';
import Spinner from './HomeSpinner';

const Container = styled.div`
    width:100%;
    height:89%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-family: 'Open Sans', sans-serif;
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    justify-content:${props => props.space ? 'space-between' : ''};
    flex-direction:${props => props.column ? 'column' : ''};
    cursor:${props => props.cursor ? props.cursor : ''};
    flex-wrap: wrap;
    margin-bottom:${props => props.bottom ? '10' : ''}px;
    margin-bottom:${props => props.bottomMax ? '35' : ''}px;
    max-height:${props => props.maxHeight ? '100' : ''}px;
    width:${props => props.width ? '620' : ''}px;
`
const CurrentWeather = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    justify-content: space-evenly;
    color:white;
    background-color: rgba(255,255,255,0.3);
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    height: 360px;
    width:620px;
`
const Weather = styled.div`
    max-width: ${props => props.max ? '120' : ''}px;
`
const WeatherIcon = styled.div`
    background-image:url(${props => props.img});
    background-size: cover;
    width:20px;
    height:20px;
    ${props =>
        props.size &&
        css`
        width:100px;
        height:100px;
        margin-top:10px;
    `
    }
`
const P = styled.p`
    margin:0;
    margin-left:${props => props.left ? '5' : ''}px;
    margin-right:${props => props.right ? '5' : ''}px;
    font-weight:${props => props.bold ? 'bold' : ''};
    font-size:${props => props.maxSize ? '80' : '15'}px;
    font-size:${props => props.size ? '40' : ''}px;
    margin-right:${props => props.maxRight ? '20' : ''}px;
    margin-bottom:${props => props.bottom ? '10' : ''}px;
    margin-top:${props => props.top ? '10' : ''}px;
`
const AirlyElement = styled.div`
    background: ${props => props.currentColor ? props.currentColor : ''};
    padding: 10px 5px;
    border-radius: 10px;
    margin: 8px 0;
    text-align: center;
    min-width: 45px;
    color: black;
`

class HomeMain extends Component {


    componentDidUpdate(newProps) {
        if (this.props.currentLocation !== newProps.currentLocation && this.props.currentLocation.hits.length > 0 ) {
            this.props.onGetCurrentWeather('ready',
                this.props.currentLocation.hits[0].point.lat,
                this.props.currentLocation.hits[0].point.lng)
            
            this.props.onGetAirly('airlyReady',
                this.props.currentLocation.hits[0].point.lat,
                this.props.currentLocation.hits[0].point.lng
            )
        }
    }

    sunRise = () => {
        if (this.props.status === 'ready') {
            const timeStamp = this.props.weather.daily.data[0].sunriseTime;
            const date = new Date(timeStamp * 1000);
            const hours = "0" + date.getHours();
            const minutes = "0" + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }

    }
    sunDown = () => {
        if (this.props.status === 'ready') {
            const timeStamp = this.props.weather.daily.data[0].sunsetTime;
            const date = new Date(timeStamp * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }

    }
    time = (number) => {
        if (this.props.status === 'ready') {
            const timeStamp = this.props.weather.hourly.data[number].time;
            const date = new Date(timeStamp * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }

    }

    weatherIcon = () => {
        const { status, weather } = this.props
        switch (status === "ready") {
            case weather.currently.icon === "clear-day":
                return <WeatherIcon size img={weatherIcons.clearDay}></WeatherIcon>
            case weather.currently.icon === "partly-cloudy-day":
                return <WeatherIcon size img={weatherIcons.partlyCloudyDay}></WeatherIcon>
            case weather.currently.icon === "partly-cloudy-night":
                return <WeatherIcon size img={weatherIcons.partlyCloudyNight}></WeatherIcon>
            case weather.currently.icon === "clear-night":
                return <WeatherIcon size img={weatherIcons.clearNight}></WeatherIcon>
            case weather.currently.icon === "rain":
                return <WeatherIcon size img={weatherIcons.rain}></WeatherIcon>
            case weather.currently.icon === "snow":
                return <WeatherIcon size img={weatherIcons.snow}></WeatherIcon>
            case weather.currently.icon === "sleet":
                return <WeatherIcon size img={weatherIcons.sleet}></WeatherIcon>
            case weather.currently.icon === "wind":
                return <WeatherIcon size img={weatherIcons.windy}></WeatherIcon>
            case weather.currently.icon === "fog":
                return <WeatherIcon size img={weatherIcons.fog}></WeatherIcon>
            case weather.currently.icon === "cloudy":
                return <WeatherIcon size img={weatherIcons.cloudy}></WeatherIcon>
        }
    }


    render() {
        const { weather, currentLocation, airly } = this.props

        return (
            <Container>
                <HomeSearch />
                {this.props.status === 'ready' && this.props.close && this.props.currentLocation.hits.length > 0 ?
                    <CurrentWeather>
                        <Wrapper>
                            <Weather>
                                {currentLocation.hits ?
                                <Wrapper>
                                    <P size right>{currentLocation.hits[0].name}</P>
                                </Wrapper>
                                : null
                                }   
                                <Wrapper maxHeight>
                                    {this.weatherIcon()}
                                    <P maxSize>
                                        {Math.ceil((weather.currently.temperature - 32) / 1.8)}°
                                    </P>
                                    <P left bold>°C</P>
                                    <P bold left right>/</P>
                                    <P bold>°F</P>
                                </Wrapper>
                                <Wrapper bottomMax>
                                    <P bottom top>
                                        {weather.currently.summary}
                                    </P>
                                </Wrapper>
                                <Wrapper bottom>
                                    <WeatherIcon img={weatherIcons.cloudyCover} />
                                    <P left maxRight>{Math.floor(weather.currently.cloudCover * 100)}%</P>
                                    <WeatherIcon img={weatherIcons.pressure} />
                                    <P left maxRight>{Math.floor(weather.currently.pressure)} hpa</P>
                                    <WeatherIcon img={weatherIcons.humidity} />
                                    <P left maxRight>{Math.floor(weather.currently.humidity * 100)}</P>
                                </Wrapper>
                                <Wrapper>
                                    <WeatherIcon img={weatherIcons.sunRise} />
                                    <P left maxRight>{this.sunRise()}</P>
                                    <WeatherIcon img={weatherIcons.sunDown} />
                                    <P left maxRight>{this.sunDown()}</P>
                                    <WeatherIcon img={weatherIcons.wind} />
                                    <P left maxRight>{weather.currently.windSpeed} km/h</P>
                                </Wrapper>
                            </Weather>
                        </Wrapper>
                        {weather.timezone === "Europe/Warsaw" && this.props.airlyStatus === "airlyReady" ?
                            <Wrapper>
                            {airly.current.indexes[0].lavel !== "UNKNOWN" ?
                            <Wrapper column>
                                {airly.current.values[0] !== undefined ?
                                    <AirlyElement currentColor={airly.current.indexes[0].color ? airly.current.indexes[0].color : ''}>
                                        <P>PM1</P>
                                        {airly.current.values[0].value}
                                    </AirlyElement>
                                    : null
                                }
                                {airly.current.values[1] !== undefined ?
                                    <AirlyElement currentColor={airly.current.indexes[0].color ? airly.current.indexes[0].color : ''}>
                                        <P>PM25</P>
                                        {airly.current.values[1].value}
                                    </AirlyElement>
                                    : null
                                }
                                {airly.current.values[2] !== undefined ?
                                    <AirlyElement currentColor={airly.current.indexes[0].color ? airly.current.indexes[0].color : ''}>
                                        <P>PM10</P>
                                        {airly.current.values[2].value}
                                    </AirlyElement>
                                    : null
                                }
                            </Wrapper>
                            : null
                            }
                            </Wrapper>
                            : null
                        }
                    </CurrentWeather>
                    : <Spinner />
                }
                {this.props.status === 'ready' && this.props.close ?
                    <HomeSlider />
                : null
                }
                <P size>{this.props.error}</P>
            </Container>

        );
    }
}
const mapStateToProps = state => {
    return {
        close: state.close,
        weather: state.currentWeather,
        status: state.loadStatus,
        currentLocation: state.currentLocation,
        airly: state.airly,
        airlyStatus: state.airlyStatus,
        error:state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentWeather: (status, lng, lat) => dispatch(actionCreators.getCurrentWeather(status, lng, lat)),
        onGetAirly: (status, lng, lat) => dispatch(actionCreators.getAirly(status,lng, lat))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeMain);
