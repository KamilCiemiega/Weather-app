import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';

const Container = styled.div`
    width:100%;
    height:85%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-family: 'Open Sans', sans-serif;
    display:${props => props.none ? 'none' : ''};
`
const SearchBox = styled.div`
    width:60%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.3);
    margin: 25px 0;
    border-radius: 8px;
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
    border: 1px solid #eaeaea;
    ${props => props.error &&
        css`
        border:1px solid rgba(255,0,0, 0.8);
        box-shadow: 
        0px 0px 6px rgba(255,0,0, 0.4), 
        inset 0px 0px 6px rgba(255,0,0, 0.4);
    `}
    border-radius: 8px;
    padding: 6px;
    font-size: 0.8rem;
    outline: none;
    color: #333;
    width: 90%;
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
const Button = styled.button`
    display:${props => props.error ? props.error : ''};
    border:none;
    background:white;
`
const P = styled.p`
margin:0;
margin-top:4px;
font-size:14px;
color:rgba(255,0,0, 1);
`
const Ul = styled.ul`
display:flex;
flex-direction:column;
justify-content:center;
width:425px;
list-style: none;
background: white;
border-radius: 5px;
cursor: pointer;
margin:0;
margin-right: 38px;
border: 1px solid #999;
`
const Li = styled.li`
    margin-top: 5px;
    font-weight: bold;
    font-size: .9rem;
&:hover{
    background:#fad168;
    border-radius:10px;
}
`

class HomeSearch extends Component {

    handleChange = values => {
        this.props.onGetCityName(values.target.value)
        
        this.props.onGetFilteredSuggestions()
    }

    suggestionSelected = (elem) => {
        this.props.onGetCityName(elem)
        this.props.onEmptySuggestions()
    }

    renderSuggestions = () => {
        const { filtredCityName } = this.props
        let chosenSuggestions = filtredCityName.slice(-5)
        if (cityValue.length === 0) {
            return null;
        }
        return (
            <Ul>
                {chosenSuggestions.map((item, index) =>
                    <Li key={index} onClick={() => this.suggestionSelected(item)}>{item}</Li>)}
            </Ul>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.props.cityValue.length === 0) {
            this.props.onFormError(true)
        } else {
            this.props.onGetCurrentLocation(this.props.cityValue)
        }
    }

    handleSelect = () => {
        this.props.onFormError(false)
    }

    render() {

        return (
            <Container none={this.props.close ? 'none' : ''}>
                {this.props.close ? null :
                    <SearchBox>
                        <Wrapper space cursor="pointer">
                            <H2>Find city...</H2>
                        </Wrapper>
                        <Form onSubmit={this.handleSubmit}>
                            <Input
                                type="search"
                                name="city"
                                placeholder="city..."
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                value={this.props.cityValue}
                                error={this.props.formError && "1px solid #e03a3e"}>
                            </Input>
                            {this.props.formError && <P>Enter the city name</P>}
                            <Button
                                type="submit"
                                error={this.props.formError && "none"}>
                                <SearchIcon></SearchIcon>
                            </Button>
                            <Wrapper>
                                {this.renderSuggestions()}
                            </Wrapper>
                        </Form>
                    </SearchBox>
                }
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        close: state.close,
        currentLocation: state.currentLocation,
        cityValue:state.cityValue,
        filtredCityName: state.filtredCityName,
        formError: state.formError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentLocation: (city) => dispatch(actionCreators.getCurrentLocation(city)),
        onGetCityName: (city) => dispatch(actionCreators.getCityName(city)),
        onGetFilteredSuggestions: () => dispatch(actionCreators.getFilteredSuggestions()),
        onFormError: (err) => dispatch(actionCreators.getformError(err)),
        onEmptySuggestions: () => dispatch(actionCreators.getEmptySuggestions())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch);
