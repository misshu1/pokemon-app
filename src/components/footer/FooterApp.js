import React from 'react';
import ReactDOM from 'react-dom';

import LogoIcon from '../../assets/icons/LogoIcon';
import { Container } from './style';

const FooterApp = () => {
    return ReactDOM.createPortal(
        <Container>
            <div className='content'>
                <a
                    href='https://andreinedelus.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    title='Eleven Windows'
                >
                    <LogoIcon width='5rem' height='5rem' />
                </a>
                <p>Andrei Nedelus © 2020</p>
            </div>
        </Container>,
        document.getElementById('footer')
    );
};

export default FooterApp;
