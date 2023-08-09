import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import style from './authPage.module.css';
import { Input, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../utils/api';
import Loader from '../../components/loader/loader';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [typeInput, setrTypeInput] = useState('password');
  const navigate = useNavigate();

  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const authProcess = useSelector((store) => store.auth.authProcess);

  const loginError = useSelector((store) => store.auth.loginError);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  // console.log(authProcess);

  const onIconClick = () => {
    if (typeInput === 'password') {
      setrTypeInput('text');
    } else {
      setrTypeInput('password');
    }
  };

  const onClick = async () => {
    try {
      await dispatch(login(email, password));
    } catch (error) {
      console.error('Произошла ошибка при входе:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <h1 className={'text text_type_main-medium mb-6'}>Вход</h1>

          <div className="mb-6">
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={'name'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
          </div>

          <div className="mb-6">
            <Input
              type={typeInput}
              placeholder={'Пароль'}
              onChange={(e) => setPassword(e.target.value)}
              icon={'ShowIcon'}
              value={password}
              name={'name'}
              error={loginError ? true : false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка авторизации'}
              size={'default'}
              extraClass="ml-1"
            />
          </div>
          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large" onClick={onClick}>
              Войти
            </Button>
          </div>

          <div className={style.auth}>
            <p className="text text_type_main-default text_color_inactive mb-4 mr-2">
              Вы - новый пользователь?
            </p>
            <Link to="/register" className={style.link + ' text text_type_main-default'}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={style.auth}>
            <p className="text text_type_main-default text_color_inactive mr-2">Забыли пароль? </p>
            <Link to="/forgot-password" className={style.link + ' text text_type_main-default'}>
              Восстановить пароль
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthPage;
