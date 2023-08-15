import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetailsStyles from './ingredient-details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails({ isPage }) {
  // const ingr = useSelector((store) => store.ingredient.currentIngredient);
  // console.log(ingr);

  const { id } = useParams();

  const ingredients = useSelector((state) => state.ingredient.items);
  const ingr = ingredients.find((ingredient) => ingredient._id === id);

  console.log(ingr);
  if (!ingr) {
    return <div className={IngredientDetailsStyles.notFound}>Такого ингредиента пока нет</div>;
  }

  return (
    <div className={IngredientDetailsStyles.modal}>
      <h2
        className={
          isPage
            ? IngredientDetailsStyles.header + ' text text_type_main-large mt-10 ml-10'
            : IngredientDetailsStyles.title + ' text text_type_main-large mt-10 ml-10'
        }>
        Детали ингридиента
      </h2>
      <img className={IngredientDetailsStyles.image} src={ingr.image_large} alt={ingr.name} />

      <p className={'text text_type_main-medium mt-4 mb-8'}>{ingr.name}</p>

      <ul className={IngredientDetailsStyles.caloriesBlock}>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingr.calories}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default">{ingr.proteins}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default">{ingr.fat}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingr.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}



IngredientDetails.propTypes = {
  isPage: PropTypes.bool,
};

export default IngredientDetails;
