import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

import { getIngredients } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { getUserData } from '../../utils/api';
import MainContent from '../mainContent/mainContent';

import { RootState } from '../../services/reducers/index';


function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((store: RootState) => store.ingredient.isLoading);
  const ingredients = useSelector((store: RootState) => store.ingredient.items);

  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredients());

    if (accessToken) {
      console.log('start');
      dispatch(getUserData());
    }
  }, [dispatch]);

  return (
    <Router>
      {ingredients.length > 0 && (
        <div className={styles.app}>
          <AppHeader />

          {isLoading ? <Loader /> : <MainContent />}
        </div>
      )}
    </Router>
  );
}

export default App;
