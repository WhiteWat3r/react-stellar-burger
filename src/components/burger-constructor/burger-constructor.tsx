import { useState, useEffect } from 'react';

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyles from './burger-constructor.module.css';
import { useDrop } from 'react-dnd';
import {
  addConstructorIngredient,
  removeConstructorIngredient,
  replaceConstructorBun,
  updateConstructorIngredients,
} from '../../services/actions/ingredient';

import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { sendOrder } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isConstructorEmpty, setISConstaructorEmpty] = useState(true);
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();

  const constructorIngredients = useAppSelector((store) => store.ingredient.constructorItems);

  const bun = constructorIngredients.find((item) => {
    return item.type === 'bun';
  });

  useEffect(() => {
    const isEmpty = () => {
      if (constructorIngredients.length > 1 && bun) {
        return false;
      }
      return true;
    };
    setISConstaructorEmpty(isEmpty);
  }, [constructorIngredients]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingr: TIngredient) {
      const bunIndex = constructorIngredients.findIndex((item) => item.type === 'bun');
      if (bunIndex !== -1 && ingr.type === 'bun') {
        dispatch(replaceConstructorBun(ingr, bunIndex));
      } else {
        dispatch(addConstructorIngredient(ingr));
      }
    },
  });

  const onDelete = (ingr: TIngredient) => {
    dispatch(removeConstructorIngredient(ingr));
  };

  const price = constructorIngredients.reduce((acc, item) => {
    if (item.type === 'bun') {
      return acc + item.price * 2;
    }
    return acc + item.price;
  }, 0);

  const handleOrderSubmitButton = () => {
    const order = {
      ingredients: constructorIngredients.map((item) => item._id),
    };

    if (isAuthenticated) {
      dispatch(sendOrder(order));
    } else {
      localStorage.setItem('redirectPath', location.pathname);
      navigate('/login', { replace: true });
    }
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const draggedIngredient = constructorIngredients[dragIndex];
    const updatedIngredients = [...constructorIngredients];
    updatedIngredients.splice(dragIndex, 1);
    updatedIngredients.splice(hoverIndex, 0, draggedIngredient);
    dispatch(updateConstructorIngredients(updatedIngredients));
  };

  return (
    <section className={constructorStyles.block + ' pt-25 ml-10'}>
      <ul className={constructorStyles.list + ' ml-4 pr-4 mb-10'} ref={dropTarget}>
        <li className="ml-8">
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <p
              className={
                constructorStyles.text + ' text text_type_digits-default text_color_inactive'
              }>
              Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
            </p>
          )}
        </li>

        <div className={constructorStyles.nachBlock + ' custom-scroll'}>
          {constructorIngredients.map(
            (ingr, index) =>
              ingr.type !== 'bun' && (
                <ConstructorIngredient
                  ingr={ingr}
                  onDelete={onDelete}
                  key={ingr.uniqueId}
                  index={index}
                  moveIngredient={moveIngredient}
                />
              ),
          )}
        </div>

        {bun && (
          <li className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
      </ul>

      <div className={constructorStyles.basket}>
        <div className={constructorStyles.cost + ' mr-10'}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderSubmitButton}
          disabled={isConstructorEmpty}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
