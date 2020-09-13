import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '../../assets/icons/LogoIcon';
import { Container } from './style';

const HeaderApp = () => {
    const navigate = useNavigate();

    return ReactDOM.createPortal(
        <Container>
            <div className='content'>
                <div className='logo-container' onClick={() => navigate('/')}>
                    <LogoIcon width='3rem' height='3rem' />
                </div>
            </div>
        </Container>,
        document.getElementById('header')
    );
};

export default HeaderApp;
