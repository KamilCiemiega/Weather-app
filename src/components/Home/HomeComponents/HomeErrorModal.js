import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';

const HomeErrorModal = props => {
    const ErrorModal = styled.div` 
        position: fixed;
        top: 30vh;
        left: calc(50% - 15rem);
        width: 30rem;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        z-index: 100;
        border-radius: 7px;
        transition: all 0.3s ease-out;
        `
    const H2 = styled.div` 
        margin: 0;
        padding: 1rem;
        background: #ff2058;
        color: white;
        border-radius: 7px 7px 0 0;
    `

    const P = styled.div` 
          padding: 2rem;
          font-weight:bold;
        `
    const Backdrop = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 50;
    `
    const onClose = () => {
        props.onShowModal(!props.show)
    };

    return (
        <>
            {props.show  ? 
                <div onClick={onClose}>
                    <Backdrop />
                    <ErrorModal>
                        <H2>An Error Occurred!</H2>
                        <P>Something went wrong please contact with support</P>
                    </ErrorModal>
                </div>
                :null
            }
        </>
    );
}
const mapStateToProps = state => {
    return {
        show: state.showModal,
        currentLocation: state.currentLocation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowModal: (active) => dispatch(actionCreators.showModal(active))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeErrorModal);