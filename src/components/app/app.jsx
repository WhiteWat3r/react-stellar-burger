import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Loader from '../loader/loader';


import AppHeader from '../app-header/app-header';

import styles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getModalComponent } from '../../services/reducers/modal';
import { getIngredients } from '../../utils/api';

import { getCookie } from '../../utils/cookie';
import { getUserData } from '../../utils/api';
import MainContent from '../mainContent/mainContent';

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.ingredient.isLoading);
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const currentModal = useSelector((store) => store.modal.currentModal);
  const ModalComponent = getModalComponent(currentModal);

  const ingredients = useSelector((store) => store.ingredient.items);

  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredients());

    // console.log(accessToken);

    if (accessToken) {
      console.log('start');
      dispatch(getUserData());
    }
  }, [dispatch]);

  // console.log('REFRESH');
  return (
    <Router>
      {ingredients.length > 0 && (
        <div className={styles.app}>
          <AppHeader />

          {isLoading ? <Loader /> : <MainContent />}
          {/* {isModalOpen && (
            <Modal>
              <ModalComponent />
            </Modal>
          )} */}
        </div>
      )}
    </Router>
  );
}

export default App;
