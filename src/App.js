import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faExclamation,
    faExclamationTriangle,
    faInfo,
    faSpinner,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import FooterApp from './components/footer/FooterApp';
import HeaderApp from './components/header/HeaderApp';
import RoutesApp from './components/routes/Routes';
import { GlobalStyle } from './components/style/GlobalStyle';
import { NotificationsProvider } from './contexts/notificationsContext';

library.add(
    faSpinner,
    faCheck,
    faExclamation,
    faExclamationTriangle,
    faInfo,
    faTimes
);

function App() {
    return (
        <>
            <SnackbarProvider
                dense
                domRoot={document.getElementById('modal')}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <NotificationsProvider>
                    <GlobalStyle />
                    <HeaderApp />
                    <RoutesApp />
                    <FooterApp />
                </NotificationsProvider>
            </SnackbarProvider>
        </>
    );
}

export default App;
