import React from 'react';
import styles from './mainContent.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import RegisterPage from '../../pages/registerPage/registerPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage/forgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPassword/resetPasswordPage';
import ProfilePage from '../../pages/profilePage/profilePage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPage from '../../pages/ErrorPage/errorPage';
import { ProtectedRouteElement } from '../ProtectedRoutElement/ProtectedRoutElement';
import Modal from '../modal/modal';
import { closeModal } from '../../services/actions/modal';
import Loader from '../loader/loader';
import OrderDetails from '../order-details/order-details';
import LoginPage from '../../pages/loginPage/loginPage';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import FeedPage from '../../pages/feedPage/feedPage';
import ProfileOrdersPage from '../../pages/profileOrdersPage/profileOrdersPage';
import OrderContent from '../order-content/order-content';

function MainContent() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const createdOrder = useAppSelector((store) => store.ingredient.createdOrder);
  const isModalOpen = useAppSelector((store) => store.modal.isModalOpen);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseIngredientModal = () => {
    background && navigate(-1);
  };

  const handleCloseOrderModal = () => {
    dispatch(closeModal());
    background && navigate(-1); // изменить в дальнейшем
  };

  return (
    <main className={styles.main}>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} />} />
        <Route
          path="/forgot-password"
          element={<ProtectedRouteElement element={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRouteElement element={<ResetPasswordPage />} />}
        />

        <Route
          path="/profile/*"
          element={<ProtectedRouteElement onlyAuth element={<ProfilePage />} />}
        />

        <Route path="/ingredients/:id" element={<IngredientDetails isPage={true} />} />
        <Route path="/feed/:id" element={<OrderContent isPage={true} />} />

        <Route path="/feed" element={<FeedPage />} />

        <Route
          path="/profile/orders/:id"
          element={ <OrderContent isPage={true} />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {isModalOpen && (
        <Modal handleCloseModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal handleCloseModal={handleCloseIngredientModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal handleCloseModal={handleCloseIngredientModal}>
                <OrderContent />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal handleCloseModal={handleCloseIngredientModal}>
                <OrderContent />
              </Modal>
            }
          />
        </Routes>
      )}
    </main>
  );
}

export default MainContent;
