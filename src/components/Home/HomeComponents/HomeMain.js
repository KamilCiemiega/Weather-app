import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
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
    margin-top:10px;
    width:60%;
    margin-left:20%;
    margin-right:20%;
    position: relative;
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
    cursor:${props => props.cursor ? 'pointer' : ''};
    flex-wrap: wrap;
`
const Input = styled.input`
    margin-top:15px;
    border: 1px solid #eaeaea;
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

class HomeMain extends Component {
    
    render(){
        return(
            <Container>
                <SearchBox>
                    <Wrapper space cursor>
                        <H2>Znajdź miasto...</H2>
                        <CircleIcon onClick={this.props.onToggleClass}/>
                    </Wrapper>
                    <Wrapper>
                        <Input placeholder="miasto..."></Input>
                        <SearchIcon />
                    </Wrapper>
                </SearchBox>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeMain);
