import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import constructorStyles from './burger-constructor.module.css'

function BurgerConstructor({ingredients, openModal}) {

  const onClick = () => {
    openModal('OrderDetails')
  }

  return (
    <section className={constructorStyles.block + ' pt-25 ml-10'}>
   
      <ul className={constructorStyles.list + ' ml-4 pr-4 mb-10'}>




        <li className='ml-8' >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={ingredients[0].name + ' (верх)'}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
          />
        </li>
      


        <div className={constructorStyles.nachBlock + ' custom-scroll'}>
          {ingredients.map(ingr => (
            ingr.type !== 'bun' &&
            <li  key={ingr._id} className={constructorStyles.item + ' pl-8 mb-4'}>
              <div className={constructorStyles.itemIcon}>
                <DragIcon type="primary"/>
              </div>
              <ConstructorElement
                text={ingr.name}
                price={ingr.price}
                thumbnail={ingr.image}
              />
          </li>
          ))}
        </div>
   




        <li className='ml-8' >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={ingredients[0].name + ' (низ)'}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
          />
        </li>



      </ul>

      
      <div className={constructorStyles.basket}>
        <div className={constructorStyles.cost + ' mr-10'}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>


    </section>
  )
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.array,
  openModal: PropTypes.func
}


export default BurgerConstructor


