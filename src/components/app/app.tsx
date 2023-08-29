import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

import { getIngredients } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { getUserData } from '../../utils/api';
import MainContent from '../mainContent/mainContent';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

function App() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((store) => store.ingredient.isLoading);
  const ingredients = useAppSelector((store) => store.ingredient.items);

  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredients());
    // dispatch(getOrderInfo())

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


// const sayHi = () => {
//   const privet = 'privet'

//   const sayhyAgain = () => {
//     console.log(privet);
    
//   }
//   return sayhyAgain
// }

// const newSayHi = sayHi()

// newSayHi()