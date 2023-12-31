import React, { useState, useRef, useEffect } from 'react';

import style from './resetPasswordPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../utils/api';
import Loader from '../../components/loader/loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function ResetPasswordPage() {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const navigate = useNavigate();

  const location = useLocation();

  const emailFromState = location.state && location.state.email ? location.state.email : '';

  useEffect(() => {
    if (!emailFromState) {
      navigate('/', { replace: true });
    }
  }, [navigate, emailFromState]);

  const authProcess = useAppSelector((store) => store.auth.authProcess);
  const error = useAppSelector((store) => store.auth.resetPasswordError);

  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [recoverytoken, setRecoverytoken] = useState('');

  const inputRef = useRef(null);

  const handleSubmitForm = async () => {
    try {
      await dispatch(resetPassword(password, recoverytoken));
      navigate('/login');
    }catch (error) {
      console.error('Ошибка при восстановлении пароля:', error);
    }
  };

  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmitForm}>
            <h1 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h1>

            <div className="mb-6">
              <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name={'Имя'}
                error={false}
                ref={inputRef}
                //   onIconClick={onIconClick}
                icon={'ShowIcon'}
                errorText={'Ошибка восстановления пароля'}
                size={'default'}
                extraClass="ml-1"
              />
            </div>

            <div className="mb-6">
              <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={(e) => setRecoverytoken(e.target.value)}
                value={recoverytoken}
                name={'Имя'}
                error={error ? true : false}
                ref={inputRef}
                errorText={'Ошибка восстановления пароля'}
                size={'default'}
                extraClass="ml-1"
              />
            </div>
            <div className="mb-20">
              <Button type="primary" size="large" htmlType="submit">
                Восстановить
              </Button>
            </div>
          </form>

          <div className={style.auth}>
            <p className="text text_type_main-default text_color_inactive mr-2">
              Вспомнили пароль?
            </p>
            <Link to="/login" className={style.link + ' text text_type_main-default'}>
              Войти
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ResetPasswordPage;
