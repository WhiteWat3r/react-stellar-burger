import React, { useState, useRef, useEffect } from 'react';

import style from './resetPasswordPage.module.css';
import { Input, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../utils/api';
import Loader from '../../components/loader/loader';

function ResetPasswordPage() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location.state);
  // console.log(location.state.email);

  const emailFromState = location.state && location.state.email ? location.state.email : '';

  useEffect(() => {
    if (isAuthenticated || !emailFromState) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate, emailFromState]);

  const authProcess = useSelector((store) => store.auth.authProcess);
  const error = useSelector((store) => store.auth.resetPasswordError);

  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [recoverytoken, setRecoverytoken] = useState('');

  const inputRef = useRef(null);

  const onClick = async () => {
    const response = await dispatch(resetPassword(password, recoverytoken));
    if (!response.error) {
      navigate('/login');
    }
  };

  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
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
            <Button htmlType="button" type="primary" size="large" onClick={onClick}>
              Восстановить
            </Button>
          </div>

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
