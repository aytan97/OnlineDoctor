import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cover from './shared/modules/Cover';
import { HelmetProvider } from 'react-helmet-async';
import Header from './shared/layout/Header';
import Router from './pages';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getMe } from './redux/features/auth/getMeSlice.ts';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.result.token);
  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);
  return (
    <Cover>
      <HelmetProvider>
        <HeaderAndHome />
        <Router />
      </HelmetProvider>
    </Cover>
  );
};

const HeaderAndHome: React.FC = () => {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/otp-verification';
  return shouldShowHeader ? <Header /> : null;
};

export default App;