import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../services/actions/modal';
import { useDrop } from 'react-dnd';
import {
  addConstructorIngredient,
  removeConstructorIngredient,
  replaceConstructorBun,
  updateConstructorIngredients,
} from '../../services/reducers/ingredient';

import ConstructorIngredient from '../constructorIngredient/constructorIngredient';
import { sendOrder } from '../../services/actions/ingredient';

function BurgerConstructor() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addConstructorIngredient(ingredients[0]));
    // console.log('add default bun');
  }, []);

  const ingredients = useSelector((store) => store.ingredient.items);
  const constructorIngredients = useSelector((store) => store.ingredient.constructorItems);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingr) {
      const bunIndex = constructorIngredients.findIndex((item) => item.type === 'bun');
      // console.log(bun);
      if (bunIndex !== -1 && ingr.type === 'bun') {
        dispatch(replaceConstructorBun(ingr, bunIndex));
      } else {
        dispatch(addConstructorIngredient(ingr));
      }
    },
  });

  const onDelete = (ingr) => {
    dispatch(removeConstructorIngredient(ingr));
  };

  const price = constructorIngredients.reduce((acc, item) => {
    if (item.type === 'bun') {
      return acc + item.price * 2;
    }
    return acc + item.price;
  }, 0);

  const bun = constructorIngredients.find((item) => {
    return item.type === 'bun';
  });

  const handleOrderSubmitButton = () => {
    const order = {
      ingredients: constructorIngredients.map((item) => item._id),
    };

    dispatch(sendOrder(order));
    dispatch(openModal('OrderDetails'));
  };

  const moveIngredient = (dragIndex, hoverIndex) => {
    const draggedIngredient = constructorIngredients[dragIndex];
    const updatedIngredients = [...constructorIngredients];
    updatedIngredients.splice(dragIndex, 1);
    updatedIngredients.splice(hoverIndex, 0, draggedIngredient);
    dispatch(updateConstructorIngredients(updatedIngredients));
  };

  return (
    constructorIngredients.length > 0 && (
      <section className={constructorStyles.block + ' pt-25 ml-10'}>
        <ul className={constructorStyles.list + ' ml-4 pr-4 mb-10'} ref={dropTarget}>
          <li className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>

          <div className={constructorStyles.nachBlock + ' custom-scroll'}>
            {constructorIngredients.map(
              (ingr, index) =>
                ingr.type !== 'bun' && (
                  <ConstructorIngredient
                    ingr={ingr}
                    onDelete={onDelete}
                    key={ingr._id + Math.random()}
                    index={index}
                    moveIngredient={moveIngredient}
                  />
                ),
            )}
          </div>

          <li className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>

        <div className={constructorStyles.basket}>
          <div className={constructorStyles.cost + ' mr-10'}>
            <p className="text text_type_digits-medium">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderSubmitButton}>
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  );
}



export default BurgerConstructor;
