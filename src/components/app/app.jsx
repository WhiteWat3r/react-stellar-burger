import { useEffect, useState } from "react";

import Loader from "../loader/loader";
import Modal from "../modal/modal";
import ModalOverlay from "../overlay/modalOverlay";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import { data } from "../../utils/data";

import styles from "./app.module.css";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { useModal } from "../../hooks/useModal";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState(null);



  const { isModalOpen, openModal, closeModal, currentModal } = useModal();



  useEffect(() => {
    setIsLoading(true);

    fetch(baseUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => setIngredients(data.data))
      .catch(console.error())
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <BurgerIngredients
            ingredients={ingredients}
            setCardData={setCardData}
            openModal={openModal}
          />
          <BurgerConstructor ingredients={ingredients} openModal={openModal} />
        </main>
      )}
      {isModalOpen && (
        <>
          <Modal closeModal={closeModal}>
            {currentModal === "OrderDetails" ? (
              <OrderDetails closeModal={closeModal} cardData={cardData} />
            ) : (
              <IngredientDetails closeModal={closeModal} cardData={cardData} />
            )}
          </Modal>

        </>
      )}
    </div>
  );
}

export default App;
