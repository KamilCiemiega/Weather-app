import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import { Formik } from 'formik';
import { CloseCircle } from '@styled-icons/evaicons-solid/CloseCircle';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';
import clearDay from '../../../assets/images/weatcherIcons/clear-day.png';
import cloudy from '../../../assets/images/weatcherIcons/cloudy.png';
import cloudyCover from '../../../assets/images/cloudy.png';
import pressure from '../../../assets/images/pressure.png';
import sunDown from '../../../assets/images/sunDown.png';
import sunRise from '../../../assets/images/sunRise.png';
import wind from '../../../assets/images/wind.png';
import humidity from '../../../assets/images/humidity.png';


const Container = styled.div`
    width:100%;
    height:85%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family: 'Open Sans', sans-serif;
`
const SearchBox = styled.div`
    width:60%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.3);
    margin: 25px 0;
    border-radius: 8px;
    height: 80px;
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
`
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content:center;
    justify-content:${props => props.space ? 'space-between' : ''};
    cursor:${props => props.cursor ? props.cursor : ''};
    flex-wrap: wrap;
`
const Input = styled.input`
    margin-top:15px;
    border: ${props => props.error ? props.error : '1px solid #eaeaea'};
    border-radius: 8px;
    padding: 6px;
    font-size: 0.8rem;
    outline: none;
    color: #333;
    width: 90%;
`
const CircleIcon = styled(CloseCircle)`
  color:#fad168;
  height:30px;
  width:30px;
`
const SearchIcon = styled(SearchAlt2)`
    color:#9e9c9c;
    height:30px;
    width:30px;
    margin-top:12px;
    cursor:pointer;
`

const H2 = styled.h2`
    margin:0;
    padding:0;
    margin-left:22px;
`
const CurrentWeatcher = styled.div`
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
const Weatcher = styled.div`
    max-width: ${props => props.max ? '120' : 'null'}px;
`
const WeatcherIcon = styled.div`
    background-image:url(${props => props.img});
    background-size: cover;
    width:20px;
    height:20px;
    ${props =>
        props.size &&
        css`
        width:100px;
        height:100px;
        margin-top:20px;
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
    margin-bottom:${props => props.bottom ? '15' : ''}px;
`
const Button = styled.button`
    border:none;
    background:white;
`
const AirlyElement = styled.div`
    background: ${props => props.medium ? props.medium : 'rgb(209, 207, 30)'};
    padding: 10px 5px;
    border-radius: 10px;
    margin: 8px 0;
    text-align: center;
    min-width: 45px;
    color: black;
`

class HomeMain extends Component {


    componentDidUpdate(newProps){
        if(this.props.currentLocation !== newProps.currentLocation){
           this.props.onGetCurrentWeather('ready',
           this.props.currentLocation.hits[0].point.lat,
           this.props.currentLocation.hits[0].point.lng)
           this.props.onGetAirly(
            this.props.currentLocation.hits[0].point.lat,
            this.props.currentLocation.hits[0].point.lng
           )
        }
    }

    closeClass = () => {
        this.props.onCloseClass(!this.props.close);
    };

    sunRise = () => {
        if(this.props.status === 'ready'){
            const timeStamp = this.props.weatcher.daily.data[0].sunriseTime;
            const date = new Date(timeStamp * 1000);
            const hours = "0" + date.getHours();
            const minutes = "0" + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }
        
    }
    sunDown = () => {
        if(this.props.status === 'ready'){
            const timeStamp = this.props.weatcher.daily.data[0].sunsetTime;
            const date = new Date(timeStamp * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }
        
    }

    weatcherIcon = () => {
        const { status, weatcher } = this.props
        switch (status === "ready") {
            case weatcher.currently.icon === "clear-day":
                return <WeatcherIcon size img={clearDay}></WeatcherIcon>
                break;
            case weatcher.currently.icon === "partly-cloudy-day":
                return <WeatcherIcon size img={cloudy}></WeatcherIcon>
                break;
        }
    }

    render() {
        const { weatcher,currentLocation,airly } = this.props

        const validate = values => {
            const errors = {};
            if (!values.city) {
                errors.city = 'Podaj miasto'
            }
            return errors;

        }
        return (
            <Container>
                {this.props.close ? null :
                    <SearchBox>
                        <Wrapper space cursor="pointer">
                            <H2>Znajdź miasto...</H2>
                            <CircleIcon onClick={this.closeClass} />
                        </Wrapper>
                        <Formik
                            initialValues={{ city: "" }}
                            validate={validate}

                            onSubmit={(values) => {
                                this.props.onGetCurrentLocation(values.city)
                            }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Input
                                            name="city"
                                            placeholder="miasto..."
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.city}
                                            error={touched.city && errors.city ? "1 px solid green" : null}>
                                        </Input>
                                        {
                                            errors.city && touched.city ?
                                                (
                                                    <p>{errors.city}</p>
                                                ) : null
                                        }
                                        <Button onSubmit={isSubmitting} >
                                            <SearchIcon></SearchIcon>
                                        </Button>
                                    </Form>
                            )}
                        </Formik>
                        
                    </SearchBox>
                }
                {   this.props.status === 'ready' && this.props.close ?
                
                    <CurrentWeatcher>
                        <Wrapper>
                                <Weatcher>
                                    <Wrapper>
                                        <P size right>{currentLocation.hits[0].name}</P>
                                    </Wrapper>
                                    <Wrapper maxHeight>
                                        {this.weatcherIcon()}
                                        <P maxSize>
                                            {Math.ceil((weatcher.currently.temperature - 32) / 1.8)}°
                                        </P>
                                        <P left bold>°C</P>
                                        <P bold left right>/</P>
                                        <P bold>°F</P>
                                    </Wrapper>
                                    <Wrapper bottomMax>
                                        <P bottom>
                                            {weatcher.currently.summary}
                                        </P>
                                    </Wrapper>
                                    <Wrapper bottom>
                                        <WeatcherIcon img={cloudyCover}/>
                                        <P left maxRight>{weatcher.currently.cloudCover * 100}%</P>
                                        <WeatcherIcon img={pressure}/>
                                        <P left maxRight>{Math.floor(weatcher.currently.pressure)} hpa</P>
                                        <WeatcherIcon img={humidity}/>
                                        <P left maxRight>{weatcher.currently.humidity * 100}</P>
                                    </Wrapper>
                                    <Wrapper>
                                        <WeatcherIcon img={sunRise}/>
                                        <P left maxRight>{this.sunRise()}</P>
                                        <WeatcherIcon img={sunDown}/>
                                        <P left maxRight>{this.sunDown()}</P>
                                        <WeatcherIcon img={wind}/>
                                        <P left maxRight>{weatcher.currently.windSpeed} km/h</P>
                                    </Wrapper>
                                    
                                </Weatcher>
                            </Wrapper>
                            <Wrapper column>
                            {/* #efbd11 */}
                                <AirlyElement >
                                    <P>PM1</P>
                                    {airly.current.values[0].value}
                                </AirlyElement>
                                <AirlyElement >
                                    <P>PM25</P>
                                    {airly.current.values[1].value}
                                </AirlyElement>
                                <AirlyElement>
                                    <P>PM10</P>
                                    {airly.current.values[2].value}
                                </AirlyElement>
                            </Wrapper>
                    </CurrentWeatcher>
                    : null
                }
                
            </Container>

        );
    }
}
const mapStateToProps = state => {
    return {
        close: state.close,
        weatcher: state.currentWeatcher,
        status: state.loadStatus,
        currentLocation: state.currentLocation,
        airly: state.airly
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseClass: (active) => dispatch(actionCreators.closeClass(active)),
        onGetCurrentWeather: (status,lng,lat) => dispatch(actionCreators.getCurrentWeather(status,lng,lat)),
        onGetCurrentLocation: (city) => dispatch(actionCreators.getCurrentLocation(city)),
        onGetAirly: (lng,lat) => dispatch(actionCreators.getAirly(lng,lat)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeMain);
