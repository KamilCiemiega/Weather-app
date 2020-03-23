import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import sunImg from '../../../assets/images/sunGif.gif';
import refresh from '../../../assets/images/refresh.png';
import search from '../../../assets/images/search.png';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';

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
    width:${props => (props.width ? '1024' : '250')}px;
    justify-content:${props => (props.space ? 'space-between' : null)}; 
`
const Logo = styled.div`
   background-image:url(${props => props.img});
   background-size: cover;
   cursor:pointer;
   width:50px;
   height:50px;
   display:flex;
   font-weight:bold;
   ${props =>
        props.size &&
        css`
        width: 20px;
        height:20px;
        margin-right:20px;
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

class HomeHeader extends Component {

    toggleClass = () => {
        this.props.onToggleClass(!this.props.activeClass);
    };

    render() {
        const style = {
            fontWeight: 'bold',
            marginLeft: '5%'
        }
        return (
            <Container>
                <Wrapper width space>
                    <Wrapper>
                        <Logo img={sunImg}></Logo>
                        <p style={style}>WeatherApp</p>
                    </Wrapper>
                    <Wrapper>
                        <Logo size img={refresh}></Logo>
                        { this.props.activeClass ? 
                        <Input placeholder="miasto..." type="search"></Input>
                        : null
                        }
                        <Logo
                            size
                            img={search}
                            onClick={this.toggleClass}>
                        </Logo>
                    </Wrapper>
                </Wrapper>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        activeClass: state.toggle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleClass: (active) => dispatch(actionCreators.toggleClass(active)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);