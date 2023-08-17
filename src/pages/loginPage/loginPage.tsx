import React, { useEffect, useState, useRef, FormEvent} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import style from './loginPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../utils/api';
import Loader from '../../components/loader/loader';
import { RootState } from '../../services/reducers';

type InputType = "email" | "password" | "text";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [typeInput, setrTypeInput] = useState<InputType>('password');
  const navigate = useNavigate();

  const isAuthenticated = useSelector((store: RootState) => store.auth.isAuthenticated);
  const authProcess = useSelector((store: RootState) => store.auth.authProcess);

  const loginError = useSelector((store: RootState) => store.auth.loginError);

  const inputRef = useRef(null);
  const dispatch = useDispatch();


  const onIconClick = () => {
    if (typeInput === 'password') {
      setrTypeInput('text');
    } else {
      setrTypeInput('password');
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login(email, password));
    } catch (error) {
      console.error('Произошла ошибка при входе:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmitForm}>
          <h1 className={'text text_type_main-medium mb-6'}>Вход</h1>

            <div className="mb-6">
              <Input
                type='email'
                placeholder='E-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name='name'
                error={false}
                ref={inputRef}
                errorText='Ошибка'
                size='default'
                extraClass="ml-1"
              />
            </div>

            <div className="mb-6">
              <Input
                type={typeInput}
                placeholder='Пароль'
                onChange={(e) => setPassword(e.target.value)}
                icon='ShowIcon'
                value={password}
                name='name'
                error={loginError ? true : false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText='Ошибка авторизации'
                size='default'
                extraClass="ml-1"
              />
            </div>
            <div className="mb-20">
              <Button htmlType='submit' type="primary" size="large">
                Войти
              </Button>
            </div>
          </form>
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

export default LoginPage;
