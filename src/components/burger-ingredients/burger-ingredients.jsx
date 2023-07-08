import React from 'react'
import PropTypes from 'prop-types'

import Ingredient from '../ingredient/ingredient';

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'


import ingredientsStyles from './burger-ingredients.module.css'

function BurgerIngredients({ingredients, setCardData, openModal}) {


  return (
    <section className={ingredientsStyles.section}>

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div style={{display: 'flex'}} className='mb-10'>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </div>
      <div className={`${ingredientsStyles.scrollDiv} ${ingredientsStyles.scrollDiv} custom-scroll`}>
        
        <h2 className="text text_type_main-medium " >Булки</h2>
        <ul className={ingredientsStyles.items}>
        {ingredients.map(ingr => (
            ingr.type === 'bun' &&
            <Ingredient
              setCardData={setCardData}
              openModal={openModal}
              ingr={ingr}
              key={ingr._id}
            />
        ))}
        </ul>

        <h2 className="text text_type_main-medium">Cоусы</h2>
        <ul className={ingredientsStyles.items}>
        {ingredients.map(ingr => (
            ingr.type === 'sauce' &&
            <Ingredient
              setCardData={setCardData}
              key={ingr._id}
              ingr={ingr}
              openModal={openModal}
            />
        ))}
        </ul>

        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={ingredientsStyles.items}>
        {ingredients.map(ingr => (
            ingr.type === 'main' &&
            <Ingredient
              setCardData={setCardData}
              key={ingr._id}
              ingr={ingr}
              openModal={openModal}
            />
        ))}
        </ul>
      </div>

    </section>
  )
}


BurgerIngredients.propTypes = {
  ingredients: PropTypes.array,
  openModal: PropTypes.func,
  setCardData: PropTypes.func
}



export default BurgerIngredients
