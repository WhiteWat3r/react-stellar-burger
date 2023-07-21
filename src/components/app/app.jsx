import { useEffect, useState } from 'react';

import Loader from '../loader/loader';
import Modal from '../modal/modal';
import ModalOverlay from '../overlay/modalOverlay';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { data } from '../../utils/data';

import styles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredient';
import { getModalComponent } from '../../services/reducers/modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.ingredient.isLoading);
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const currentModal = useSelector((store) => store.modal.currentModal);
  const ModalComponent = getModalComponent(currentModal);

  const ingredients = useSelector((store) => store.ingredient.items);

  useEffect(() => {
    dispatch(fetchIngredients());
    console.log('FIRST');
  }, [dispatch]);

  console.log('REFRESH');
  return (
    ingredients.length > 0 && (
      <div className={styles.app}>
        <AppHeader />

        {isLoading ? (
          <Loader />
        ) : (
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        )}
        {isModalOpen && (
          <>
            <Modal>
              <ModalComponent />
            </Modal>
          </>
        )}
      </div>
    )
  );
}

export default App;
