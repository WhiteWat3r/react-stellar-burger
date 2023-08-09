import React from 'react';
import styles from './mainContent.module.css';
import { Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import AuthPage from '../../pages/authPage/authPage';
import RegisterPage from '../../pages/registerPage/registerPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage/forgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPassword/resetPasswordPage';
import ProfilePage from '../../pages/profilePage/profilePage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPage from '../../pages/ErrorPage/errorPage';
import { ProtectedRouteElement } from '../ProtectedRoutElement/ProtectedRoutElement';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/modal';

function MainContent() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(closeModal('IngredientDetails'));
    background && navigate(-1);
  };
  // console.log('background', background);
  // console.log('location', location);
  return (
    <main className={styles.main}>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />} />} />

        <Route path="/ingredients/:id" element={<IngredientDetails isPage={true} />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal handleCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </main>
  );
}

export default MainContent;
