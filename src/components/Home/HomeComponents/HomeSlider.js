import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import * as weatherIcons from './WeatherIcons/Icons';
import nextIcon from '../../../assets/images/next.png';
import prevIcon from '../../../assets/images/back.png';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    justify-content:${props => props.around ? 'space-around' : ''};
    flex-direction:${props => props.column ? 'column' : ''};
    margin-top:${props => props.top ? '20' : ''}px;
    max-height:${props => props.maxHeight ? '100' : ''}px;
    width:${props => props.width ? '620' : ''}px;
    height:135px;
`
const WeatherIcon = styled.div`
    background-image:url(${props => props.img});
    background-size: cover;
    cursor:${props => props.cursor ? 'pointer' : ''};
    width:40px;
    height:40px;
`
const P = styled.p`
    margin:0;
    font-size:${props => props.size ? '40' : '15'}px;
    margin-right:${props => props.maxRight ? '20' : ''}px;
    color:white;
`
const WeatherElement = styled.div`
height:135px;
width:125px;
background-color: rgba(255,255,255,0.3);
box-shadow: 0 6px 15px 2px rgba(0,0,0,0.3);
border-radius: 8px; 
`

class HomeSlider extends Component {

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

    weatherIcon = (number) => {
        const { status, weather } = this.props
        switch (status === "ready") {
            case weather.hourly.data[number].icon === "clear-day":
                return <WeatherIcon img={weatherIcons.clearDay}></WeatherIcon>
            case weather.hourly.data[number].icon === "partly-cloudy-day":
                return <WeatherIcon img={weatherIcons.partlyCloudyDay}></WeatherIcon>
            case weather.hourly.data[number].icon === "partly-cloudy-night":
                return <WeatherIcon img={weatherIcons.partlyCloudyNight}></WeatherIcon>
            case weather.hourly.data[number].icon === "clear-night":
                return <WeatherIcon img={weatherIcons.clearNight}></WeatherIcon>
            case weather.hourly.data[number].icon === "rain":
                return <WeatherIcon img={weatherIcons.rain}></WeatherIcon>
            case weather.hourly.data[number].icon === "snow":
                return <WeatherIcon img={weatherIcons.snow}></WeatherIcon>
            case weather.hourly.data[number].icon === "sleet":
                return <WeatherIcon img={weatherIcons.sleet}></WeatherIcon>
            case weather.hourly.data[number].icon === "wind":
                return <WeatherIcon img={weatherIcons.windy}></WeatherIcon>
            case weather.hourly.data[number].icon === "fog":
                return <WeatherIcon img={weatherIcons.fog}></WeatherIcon>
            case weather.hourly.data[number].icon === "cloudy":
                return <WeatherIcon img={weatherIcons.cloudy}></WeatherIcon>
        }
    }

    previousPage = () => {
        if(this.props.page1 > 0){
            this.props.onPreviousPage()
        }
    }

    nextPage = () => {
        if(this.props.page1 <= 24){
            this.props.onNextPage()
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {
          this.nextPage()
        }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    startInterval = () => {
        this.interval = setInterval(() => {
          this.nextPage()
        }, 5000)
    }
    
      stopInterval = () => {
        clearInterval(this.interval)
      }


    render() {
        const { weather, page1, page2, page3, page4 } = this.props

        return (
            <Wrapper around width top>
                <WeatherIcon
                    img={prevIcon}
                    cursor
                    onClick={this.previousPage}
                    onMouseOver={this.stopInterval}
                    onMouseLeave={this.startInterval}>
                </WeatherIcon>
                <WeatherElement>
                    <Wrapper column>
                        {this.weatherIcon(page1)}
                        <P >{weather.hourly.data[page1].summary}</P>
                        <P size>
                            {Math.ceil((weather.currently.temperature - 32) / 1.8)}°
                        </P>
                        <P>{this.time(page1)}</P>
                    </Wrapper>
                </WeatherElement>
                <WeatherElement>
                    <Wrapper column>
                        {this.weatherIcon(page2)}
                        <P >{weather.hourly.data[page2].summary}</P>
                        <P size>
                            {Math.ceil((weather.currently.temperature - 32) / 1.8)}°
                        </P>
                        <P>{this.time(page2)}</P>
                    </Wrapper>
                </WeatherElement>
                <WeatherElement>
                    <Wrapper column>
                        {this.weatherIcon(page3)}
                        <P >{weather.hourly.data[page3].summary}</P>
                        <P size>
                            {Math.ceil((weather.currently.temperature - 32) / 1.8)}°
                        </P>
                        <P>{this.time(page3)}</P>
                    </Wrapper>
                </WeatherElement>
                <WeatherElement>
                    <Wrapper column>
                        {this.weatherIcon(page4)}
                        <P >{weather.hourly.data[page4].summary}</P>
                        <P size>
                            {Math.ceil((weather.currently.temperature - 32) / 1.8)}°
                        </P>
                        <P>{this.time(page4)}</P>
                    </Wrapper>
                </WeatherElement>
                <WeatherIcon
                    img={nextIcon}
                    cursor
                    onClick={this.nextPage}
                    onMouseOver={this.stopInterval}
                    onMouseLeave={this.startInterval}>
                </WeatherIcon>
            </Wrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        weather: state.currentWeather,
        status: state.loadStatus,
        page1: state.page1,
        page2: state.page2,
        page3: state.page3,
        page4: state.page4,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onNextPage: () => dispatch(actionCreators.nextPage()),
        onPreviousPage: () => dispatch(actionCreators.previousPage())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);
