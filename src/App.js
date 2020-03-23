import React from 'react';
import './App.css';
import styled from 'styled-components';
import Home from './components/Home/Home';

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open Sans, sans-serif;
    width:100%;
    height:100vh;
`

function App() {
  return (
      <Wrapper>
         <Home />
      </Wrapper>  
  )
}

export default App;
