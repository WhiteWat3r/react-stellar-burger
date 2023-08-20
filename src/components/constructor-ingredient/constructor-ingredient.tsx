import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import React, { useRef, FC } from 'react';
import constructorIngredientStyles from './constructor-ingredient.module.css';
import { TIngredient } from '../../services/types';


type TConstructorIngredientProps = {
  ingr: TIngredient;
  onDelete: (ingr:TIngredient) => void;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

const ConstructorIngredient: FC<TConstructorIngredientProps> = ({ ingr, onDelete, index, moveIngredient }) => {
  const [, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    hover(item: {index: number}) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  drag(drop(ref));

  return (
    <li ref={ref} className={constructorIngredientStyles.item + ' pl-8 mb-4'}>
      <div className={constructorIngredientStyles.itemIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingr.name}
        price={ingr.price}
        thumbnail={ingr.image}
        handleClose={() => onDelete(ingr)}
      />
    </li>
  );
}


export default ConstructorIngredient;
