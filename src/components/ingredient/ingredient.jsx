import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import ingredientStyles from './ingredient.module.css'


function Ingredient({ ingr, openModal}) {

  const onClick = () => {
    openModal('IngredientDetails', ingr)
  }



  return (
    <a className={`${ingredientStyles.list} mt-6 mb-10 ml-4 mr-1`} href='#' onClick={onClick} >

      <Counter count={0} size="default" extraClass="m-1" />

      <img src={ingr.image} alt={ingr.name} className='ml-4 mr-4 mb-1'/>

      <div className={`${ingredientStyles.price} mb-1 text text_type_digits-default`} >
        <p style={{margin: 0}}>{ingr.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={'text text_type_main-default mt-4 mb-4'}>{ingr.name}</p>
      
    </a>
  )
}


Ingredient.propTypes = {
  ingr: PropTypes.object,
  openModal: PropTypes.func
}

export default Ingredient
