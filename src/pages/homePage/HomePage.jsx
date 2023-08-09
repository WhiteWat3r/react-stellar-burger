import React from 'react';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';

function HomePage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
}

export default HomePage;
