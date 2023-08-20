import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import style from './registerPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../utils/api';
import Loader from '../../components/loader/loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authProcess = useAppSelector((store) => store.auth.authProcess);

  const error = useAppSelector((store) => store.auth.error);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleSubmitForm = async () => {
    const error = await dispatch(register(email, password, name));

    console.log(error);
    !error && navigate('/login');
  };

  return (
    <div className={style.container}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmitForm}>
            <h1 className={'text text_type_main-medium mb-6'}>Регистрация</h1>

            <div className="mb-6">
              <Input
                type="text"
                placeholder="Имя"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="Имя"
                error={false}
                ref={inputRef}
                errorText="Ошибка"
                size="default"
                extraClass="ml-1"
              />
            </div>

            <div className="mb-6">
              <Input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="name"
                error={error ? true : false}
                ref={inputRef}
                errorText="Ошибка, проверьте правильность введенных данных"
                size="default"
                extraClass="ml-1"
              />
            </div>

            <div className="mb-6">
              <Input
                type="text"
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="Имя"
                error={false}
                ref={inputRef}
                //   onIconClick={onIconClick}
                icon="ShowIcon"
                errorText=""
                size="default"
                extraClass="ml-1"
              />
            </div>

            <div className="mb-20">
              <Button type="primary" size="large" htmlType="submit">
                Зарегистрироваться
              </Button>
            </div>
          </form>

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
