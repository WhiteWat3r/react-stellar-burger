import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import IngredientDetailsStyles from './ingredientDetails.module.css'


function IngredientDetails({closeModal, cardData}) {
  return (
    <div className={IngredientDetailsStyles.modal}>
      <h2 className={IngredientDetailsStyles.title + ' text text_type_main-large mt-10 ml-10'}>Детали ингридиента</h2>
       
       <button type='button' className={IngredientDetailsStyles.closeButton} onClick={closeModal}>
         <CloseIcon type="primary" />
       </button> 
           <img className={IngredientDetailsStyles.image} src={cardData.image_large} alt={cardData.name} />
 
           <p className={'text text_type_main-medium mt-4 mb-8'}>{cardData.name}</p>
     
           <ul className={IngredientDetailsStyles.caloriesBlock}>
             <li className={IngredientDetailsStyles.item}>
               <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
               <p className="text text_type_digits-default">{cardData.calories}</p>
             </li>
             <li className={IngredientDetailsStyles.item}>
               <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
               <p className="text text_type_digits-default">{cardData.proteins}</p>
             </li>
             <li className={IngredientDetailsStyles.item}>
               <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
               <p className="text text_type_digits-default">{cardData.fat}</p>
             </li>
             <li className={IngredientDetailsStyles.item}>
               <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
               <p className="text text_type_digits-default">{cardData.carbohydrates}</p>
             </li>
           </ul>
 
    </div>
  )
}



IngredientDetails.propTypes = {
  cardData: PropTypes.object,
  onClick: PropTypes.func
}

export default IngredientDetails
