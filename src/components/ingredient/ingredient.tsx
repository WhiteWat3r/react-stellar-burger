import React, {FC} from 'react';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyles from './ingredient.module.css';
import { setCurrentIngredient } from '../../services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';


type TIngredientProps = {
  ingr: TIngredient
}


const Ingredient: FC<TIngredientProps> = ({ ingr }) =>{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = () => {
    dispatch(setCurrentIngredient(ingr));

    navigate(`/ingredients/${ingr._id}`, {
      state: { background: location },
    });
  };

  const [, drafRef] = useDrag({
    type: 'ingredient',
    item: ingr,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li onClick={onClick} className={`${ingredientStyles.list} mt-6 mb-10 ml-4 mr-1`} ref={drafRef}>
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


export default Ingredient;
