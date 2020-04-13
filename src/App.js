import React, { lazy,Suspense } from 'react';
import './App.css';
import styled from 'styled-components';
import Home from './components/Home/Home';
import Spinner from './components/Home/HomeComponents/HomeSpinner';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open Sans, sans-serif;
    width:100%;
    height:100vh;
`
const Chart = lazy(() => import('./components/Home/HomeComponents/HomeChart'));

function App() {
  return (
      <Wrapper>
         <HashRouter>
           <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/chart' component={Chart} />
          </Switch>
          </Suspense>
      </HashRouter>
      </Wrapper>  
  )
}

export default App;
