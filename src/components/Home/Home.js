import React from 'react';
import styled from 'styled-components';
import HomeHeader from './HomeComponents/HomeHeader';
import HomeMain from './HomeComponents/HomeMain';
import mainBackground from '../../assets/images/mainBackground.jpeg';
const Container = styled.div`
    width:100%;
    height:100vh;
    background-image:url(${props => props.img});
    background-size: cover;
`

const home = (props) => {
    return(
        <Container img={mainBackground}>
            <HomeHeader />
            <HomeMain />
        </Container>
    );
}

export default home;