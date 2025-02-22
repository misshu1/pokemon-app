import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

const Container = styled.div`
    color: #d6d8de;
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${(props) =>
        props.local === 'local' &&
        css`
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        `}
`;

const SpinerLocal = ({ ready, style }) => {
    return (
        <>
            {ready && (
                <Container style={style} local='local'>
                    <FontAwesomeIcon icon='spinner' size='2x' pulse />
                </Container>
            )}
        </>
    );
};

const SpinerGlobal = ({ ready, style }) => {
    return ReactDOM.createPortal(
        <>
            {ready && (
                <Container style={style}>
                    <FontAwesomeIcon icon='spinner' size='2x' pulse />
                </Container>
            )}
        </>,
        document.getElementById('root')
    );
};

const SpinnerApp = ({ delay = 0, global, style }) => {
    const [ready, setReady] = useState(false);

    // Here we set a delay, so if the app loads faster then the specified delay, we will not display a loading indicator
    useEffect(() => {
        const time = setTimeout(() => {
            setReady(true);
        }, delay);

        return () => {
            clearTimeout(time);
        };
    }, [delay]);

    return (
        <>
            {global && <SpinerGlobal ready={ready} style={style} />}
            {!global && <SpinerLocal ready={ready} style={style} />}
        </>
    );
};

export default SpinnerApp;

SpinnerApp.propTypes = {
    delay: PropTypes.number,
};
