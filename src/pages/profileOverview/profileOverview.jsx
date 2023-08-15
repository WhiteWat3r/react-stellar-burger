import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './profileOverview.module.css';
import { setUserData } from '../../utils/api';

function ProfileOverview() {
  const user = useSelector((store) => store.auth.user);

  const [disabledButton, setDisabledButton] = useState(false);

  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    name: {
      value: user.name,
      disabled: true,
    },
    email: {
      value: user.email,
      disabled: true,
    },
    password: {
      value: 'asdasd',
      disabled: true,
    },
  });

  const handleCancelButtonClick = () => {
    setFields({
      ...fields,
      name: { ...fields.name, value: user.name, disabled: true },
      email: { ...fields.email, value: user.email, disabled: true },
    });
  };

  useEffect(() => {
    if (user.name === fields.name.value && user.email === fields.email.value) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [fields]);

  const toggleInputActive = (fieldName) => {
    setFields({
      ...fields,
      [fieldName]: {
        ...fields[fieldName],
        disabled: !fields[fieldName].disabled,
      },
    });
  };

  const handleSubmitForm = () => {
    dispatch(setUserData(fields.name.value, fields.email.value));
    console.log(2234);
    setFields({
      ...fields,
      name: { ...fields.name, disabled: true },
      email: { ...fields.email, disabled: true },
    });
  };

  return (
    <div className={style.containner}>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) =>
              setFields({ ...fields, name: { ...fields.name, value: e.target.value } })
            }
            value={fields.name.value}
            name="Имя"
            error={false}
            onIconClick={() => toggleInputActive('name')}
            icon="EditIcon"
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
            disabled={fields.name.disabled}
          />
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Логин"
            onChange={(e) =>
              setFields({ ...fields, email: { ...fields.email, value: e.target.value } })
            }
            value={fields.email.value}
            name="Логин"
            error={false}
            icon="EditIcon"
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
            disabled={fields.email.disabled}
            onIconClick={() => toggleInputActive('email')}
          />
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Пароль"
            onChange={(e) =>
              setFields({ ...fields, password: { ...fields.password, value: e.target.value } })
            }
            value={fields.password.value}
            name="Логин"
            error={false}
            icon="EditIcon"
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
            onIconClick={() => toggleInputActive('password')}
            disabled={fields.password.disabled}
          />
        </div>
        <div className={style.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancelButtonClick}>
            Отмена
          </Button>

          <Button htmlType="submit" type="primary" size="medium" disabled={disabledButton}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileOverview;
