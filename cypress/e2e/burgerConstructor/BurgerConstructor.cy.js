const constructorContainer = '[class^=burger-constructor_list]';
const item = `[data-testid^="drag-item-3"]`;
const input = '[class^=input__container]';
const constructorIngredient = '[class^=constructor-ingredient_item]';
const testUrl = 'http://localhost:3000';

describe('Тест бургер конструктора', () => {
  beforeEach(() => {
    cy.visit(testUrl);
  });

  it('Проверка конструктора и блока ингридиентов', () => {
    cy.get(constructorContainer).should('exist');

    cy.get('[class^=burger-ingredients_scrollDiv]').should('exist');
  });

  it('Проверка перетаскивания', () => {
    cy.get('[class^=ingredient_item]').find('p').contains('Соус Spicy-X');
    cy.get(constructorIngredient).should('not.exist');

    cy.get(item).trigger('dragstart');
    cy.get(constructorContainer).trigger('drop');
    cy.get(constructorIngredient).find('span').contains('Соус Spicy-X');
  });

  it('Проверка модального окна', () => {
    cy.get(item).trigger('dragstart');
    cy.get(constructorContainer).trigger('drop');

    cy.get(`[data-testid^="drag-item-0"]`).trigger('dragstart');
    cy.get(constructorContainer).trigger('drop'); // опять перетаскиваем игредиенты

    cy.get('button').click();

    cy.get(input).first().type('goirkopf@gmail.com');
    cy.get(input).last().type('1337'); // авторизация

    cy.get('button').click().wait(3000);

    cy.get('button').click();

    cy.get('[class^=order-details_modal]').should('exist'); // модалка

    cy.get('[class^=order-details_title]', { timeout: 17000 });
  });
});
