import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import { Formik } from 'formik';
import { CloseCircle } from '@styled-icons/evaicons-solid/CloseCircle';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2'

const Container = styled.div`
    width:100%;
    height:85%;
    display:flex;
    justify-content:center;
    align-items:center;
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
    cursor:${props => props.cursor ? props.cursor : ''};
    flex-wrap: wrap;
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
    width:25%;
    background-color: rgba(255,255,255,0.3);
    padding: 140px;
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    height: 80px;
`

class HomeMain extends Component {

    componentDidMount = () => {
        this.props.ongetCurrentWeather()
        this.props.onGetCurrentLocation()
    }

    closeClass = () => {
        this.props.onCloseClass(!this.props.close);
    };

    // weatcherIcon = () => {
    //     const {icon} = this.props
    //     switch(icon.currently.icon){
    //         case icon.currently.icon === "clear-day"
    //             return 
    //     }
    // }

    render(){
        const {currentWeatcher} = this.props

        const validate = values => {
            const errors = {};
            if(!values.city){
                errors.city = 'Podaj miasto'
            }
            return errors;
                
        }
        return(
            <Container>
                
                <SearchBox>
                    <Wrapper space cursor="pointer">
                        <H2>Znajdź miasto...</H2>
                        <CircleIcon onClick={this.closeClass}/>
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
                                ): null
                            }
                        <SearchIcon onSubmit={isSubmitting}/>
                        </Form>
                        )}
                    </Formik>
                </SearchBox>
                
                <CurrentWeatcher>
                    {/* {JSON.stringify(this.props.weatcher.currently)} */}
                </CurrentWeatcher>
            </Container>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        close: state.close,
        weatcher: state.currentWeatcher
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseClass: (active) => dispatch(actionCreators.closeClass(active)),
        ongetCurrentWeather: () => dispatch(actionCreators.getCurrentWeather()),
        onGetCurrentLocation: (city) => dispatch(actionCreators.getCurrentLocation(city))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeMain);
