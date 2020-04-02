import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import sunImg from '../../../assets/images/sunGif.gif';
import search from '../../../assets/images/search.png';
import localization from '../../../assets/images/place.png';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import { Formik } from 'formik';


const Container = styled.div`
   display:flex;
   align-items: center;
   justify-content:center;
   height:65px;
   width:100%;
   box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:${props => props.column ? 'column' : ''};
    width:${props => (props.width ? props.width : '300')}px;
    justify-content:${props => (props.space ? 'space-between' : '')};
    margin-right:${props => props.right ? props.right : ''}px;
`
const Logo = styled.div`
   background-image:url(${props => props.img});
   background-size: cover;
   cursor:pointer;
   width:50px;
   height:50px;
   display:flex;
   font-weight:bold;
    margin-right:${props => props.right ? '20' : ''}px;
    margin-bottom:${props => props.bottom ? '5' : ''}px;
   ${props =>
        props.size &&
        css`
        width: 20px;
        height:20px;
    `
    }
`
const Input = styled.input`
    background:lightgray;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 6px;
    font-size: 0.8rem;
    outline: none;
    color: #333;
`
const P = styled.p`
    font-weight:${props => props.bold ? 'bold' : 'null'};
    font-size:${props => props.size ? '12px' : ''};
    margin:0;
`
const Button = styled.button`
    border:none;
    background:transparent;
`
const Form = styled.form`
 display:flex;
 justify-content:center;
 align-items:center;
`


class HomeHeader extends Component {

    componentDidUpdate(newProps) {
        if (this.props.localization !== newProps.localization) {
            this.props.onGetCurrentLocation(this.props.localization.city)

            this.props.onGetCurrentWeather('ready',
                this.props.localization.lat,
                this.props.localization.lon)

            this.props.onGetAirly('airlyReady',
                this.props.localization.lat,
                this.props.localization.lon
            )
        }
    }

    toggleClass = () => {
        this.props.onToggleClass(!this.props.activeClass);
    };

    render() {

        return (
            <Container>
                <Formik
                    initialValues={{ city: "" }}
                    onSubmit={(values) => {
                        this.props.onGetCurrentLocation(values.city)
                        this.toggleClass()
                    }}>
                    {({
                        values,
                        handleChange,
                        handleSubmit
                    }) => (
                            <Wrapper width="1024" space>
                                <Wrapper>
                                    <Logo img={sunImg}></Logo>
                                    <P bold>WeatherApp</P>
                                </Wrapper>
                                <Wrapper>
                                    <Wrapper
                                        column
                                        width="60"
                                        right="15">
                                        <Logo
                                            img={localization}
                                            size
                                            onClick={this.props.onGetAutoLocalization}>
                                        </Logo>
                                        <P size>Find me</P>
                                    </Wrapper>
                                    <Form onSubmit={handleSubmit}>
                                        {this.props.activeClass ?
                                            <Input
                                                name="city"
                                                placeholder="city..."
                                                type="search"
                                                onChange={handleChange}
                                                value={values.city}>
                                            </Input>
                                            : null
                                        }
                                        <Button
                                        type="submit" >
                                            <Logo
                                                right
                                                size
                                                bottom
                                                img={search}
                                            >
                                            </Logo>
                                        </Button>
                                    </Form>
                                </Wrapper>
                            </Wrapper>
                        )}
                </Formik>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        activeClass: state.toggle,
        localization: state.autoLocalization
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleClass: (active) => dispatch(actionCreators.toggleClass(active)),
        onGetAutoLocalization: () => dispatch(actionCreators.getAutoLocalization()),
        onGetCurrentWeather: (status, lng, lat) => dispatch(actionCreators.getCurrentWeather(status, lng, lat)),
        onGetAirly: (status, lng, lat) => dispatch(actionCreators.getAirly(status, lng, lat)),
        onGetCurrentLocation: (city) => dispatch(actionCreators.getCurrentLocation(city)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);