import React, { Suspense, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useNotificationsContext } from '../../contexts/notificationsContext';
import Emoji from '../common/Emoji';
import SpinnerApp from '../common/SpinnerApp';
import LayoutApp from '../layout/LayoutApp';

const WelcomeTitle = (
  <span>
    Welcome <Emoji symbol='🌞' label='happy sun' />
  </span>
);
const welcomeMessage = (
  <span>
    This website is usless
    <br />
    Check out my{' '}
    <a
      href='https://github.com/misshu1'
      target='_blank'
      rel='noopener noreferrer'
      style={{
        color: 'inherit',
        fontSize: '1.1rem',
        fontStyle: 'italic',
      }}
    >
      Github Profile
    </a>{' '}
    for better apps.
  </span>
);

const RoutesApp = () => {
  const { showInfo } = useNotificationsContext();
  const notification = useRef(() => showInfo(WelcomeTitle, welcomeMessage));

  useEffect(() => {
    notification.current();
  }, []);

  return (
    <Routes>
      <Route
        path='/404'
        element={
          <Suspense fallback={<SpinnerApp delay={200} global />}>
            {/* <ErrorPageApp /> */}
          </Suspense>
        }
      />

      <Route path='/*' element={<LayoutApp />} />
    </Routes>
  );
};

export default RoutesApp;
