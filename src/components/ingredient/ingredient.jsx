import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyles from './ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/ingredient';
import { openModal } from '../../services/actions/modal';
import { useDrag } from 'react-dnd';

function Ingredient({ ingr }) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setCurrentIngredient(ingr));
    dispatch(openModal('IngredientDetails'));
  };

  const [{ isDrag }, drafRef] = useDrag({
    type: 'ingredient',
    item: ingr,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // const className = `${isDrag ? ingredientStyles.onDraggin : ingredientStyles.list}`

  return (
    <li className={`${ingredientStyles.list} mt-6 mb-10 ml-4 mr-1`} onClick={onClick} ref={drafRef}>
      <Counter count={ingr.__v} size="default" extraClass="m-1" />

      <img src={ingr.image} alt={ingr.name} className="ml-4 mr-4 mb-1" />

      <div className={ingredientStyles.price + ' mb-1 text text_type_digits-default'}>
        <p className={ingredientStyles.count}>{ingr.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={'text text_type_main-default mt-4 mb-4'}>{ingr.name}</p>
    </li>
  );
}

Ingredient.propTypes = {
  ingr: PropTypes.object,
};

export default Ingredient;
