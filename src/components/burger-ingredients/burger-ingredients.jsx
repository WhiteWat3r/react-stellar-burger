import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Ingredient from '../ingredient/ingredient';

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredient.items);
  const [activeTab, setActiveTab] = useState('bun');

  const scrollDivRef = useRef(null);

  // определние отступа для элемента
  const getOffsetTop = (element) => {
    let offsetTop = 0;
    if (element) {
      offsetTop += element.offsetTop - 284; // По какой-то причине отсчет идет не от scrollDiv, а от родительского BurgerConstructor. Поэтому пришлось вычитать разницу
      // console.log(offsetTop);
      element = element.offsetParent;
    }
    return offsetTop;
  };

  const bunTab = useRef();
  const sauceTab = useRef();
  const mainTab = useRef();


  const handleScroll = () => {
    const scrollDiv = scrollDivRef.current;
    const scrollPosition = scrollDiv.scrollTop;

    // верхние отступы для блоков
    const sauceTabTop = getOffsetTop(sauceTab.current);
    const mainTabTop = getOffsetTop(mainTab.current);

    // определение таба
    if (scrollPosition >= mainTabTop) {
      setActiveTab('main');
    } else if (scrollPosition >= sauceTabTop) {
      setActiveTab('sauce');
    } else {
      setActiveTab('bun');
    }
  };

  const handleTabClick = (tabValue) => {
    if (tabValue === 'bun') {
      bunTab.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tabValue === 'sauce') {
      sauceTab.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tabValue === 'main') {
      mainTab.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollDiv = scrollDivRef.current;
    scrollDiv.addEventListener('scroll', handleScroll);
    return () => {
      scrollDiv.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={ingredientsStyles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={ingredientsStyles.tab + ' mb-10'}>
        <Tab active={activeTab === 'bun'} value="bun" onClick={() => handleTabClick('bun')}>
          Булки
        </Tab>
        <Tab active={activeTab === 'sauce'} value="sauce" onClick={() => handleTabClick('sauce')}>
          Соусы
        </Tab>
        <Tab active={activeTab === 'main'} value="main" onClick={() => handleTabClick('main')}>
          Начинки
        </Tab>
      </div>
      <div className={ingredientsStyles.scrollDiv + ' custom-scroll'} ref={scrollDivRef}>
        <div id="bun-tab-content" ref={bunTab}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={ingredientsStyles.items}>
            {ingredients.map(
              (ingr) => ingr.type === 'bun' && <Ingredient ingr={ingr} key={ingr._id} />,
            )}
          </ul>
        </div>

        <div id="sauce-tab-content" ref={sauceTab}>
          <h2 className="text text_type_main-medium">Cоусы</h2>
          <ul className={ingredientsStyles.items}>
            {ingredients.map(
              (ingr) => ingr.type === 'sauce' && <Ingredient key={ingr._id} ingr={ingr} />,
            )}
          </ul>
        </div>

        <div id="main-tab-content" ref={mainTab}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={ingredientsStyles.items}>
            {ingredients.map(
              (ingr) => ingr.type === 'main' && <Ingredient key={ingr._id} ingr={ingr} />,
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
