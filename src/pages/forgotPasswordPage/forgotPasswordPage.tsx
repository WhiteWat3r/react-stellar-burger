import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import style from './forgotPasswordPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../utils/api';
import Loader from '../../components/loader/loader';
import { RootState } from '../../services/reducers';

function ForgotPasswordPage() {
  const authProcess = useSelector((store: RootState) => store.auth.authProcess);
  const navigate = useNavigate();

  const location = useLocation();

  const fromLoginPage = new URLSearchParams(location.search).get('from') === 'login';

  console.log(fromLoginPage);

  useEffect(() => {
    if (!fromLoginPage) {
      navigate('/');
    }
  }, []);

  const [email, setEmail] = useState('');
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
    navigate('/reset-password', { state: { email } });
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
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="name"
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size="default"
                extraClass="ml-1"
              />
            </div>

            <div className="mb-20">
              <Button htmlType="submit" type="primary" size="large" disabled={email ? false : true}>
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

export default ForgotPasswordPage;
