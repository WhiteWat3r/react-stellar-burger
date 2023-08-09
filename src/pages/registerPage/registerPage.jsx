import React, { useState, useRef } from 'react';

import { Link, Navigate, useNavigate } from 'react-router-dom';

import style from './registerPage.module.css';
import { Input, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const authProcess = useSelector((store) => store.auth.authProcess);

  const error = useSelector((store) => store.auth.error);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useDispatch();


  const onClick = async () => {
    const response = await dispatch(register(email, password, name));

    if (!response.error) {
      navigate('/login');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }
  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <h1 className={'text text_type_main-medium mb-6'}>Регистрация</h1>

          <div className="mb-6">
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={(e) => setName(e.target.value)}
              value={name}
              name={'Имя'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
          </div>

          <div className="mb-6">
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={'name'}
              error={error ? true : false}
              ref={inputRef}
              errorText={'Ошибка, проверьте правильность введенных данных'}
              size={'default'}
              extraClass="ml-1"
            />
          </div>

          <div className="mb-6">
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={'Имя'}
              error={false}
              ref={inputRef}
              //   onIconClick={onIconClick}
              icon={'ShowIcon'}
              errorText={''}
              size={'default'}
              extraClass="ml-1"
            />
          </div>

          <div className="mb-20">
            <Button htmlType="button" type="primary" size="large" onClick={onClick}>
              Зарегистрироваться
            </Button>
          </div>

          <div className={style.auth}>
            <p className="text text_type_main-default text_color_inactive mr-2">
              Уже зарегистрированы?
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

export default RegisterPage;
