import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetailsStyles from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {


  const ingr = useSelector(store => store.ingredient.currentIngredient)



  return (
    <div className={IngredientDetailsStyles.modal}>
      <h2
        className={
          IngredientDetailsStyles.title +
          " text text_type_main-large mt-10 ml-10"
        }
      >
        Детали ингридиента
      </h2>
      <img
        className={IngredientDetailsStyles.image}
        src={ingr.image_large}
        alt={ingr.name}
      />

      <p className={"text text_type_main-medium mt-4 mb-8"}>{ingr.name}</p>

      <ul className={IngredientDetailsStyles.caloriesBlock}>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default">{ingr.calories}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default">{ingr.proteins}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default">{ingr.fat}</p>
        </li>
        <li className={IngredientDetailsStyles.item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default">
            {ingr.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
