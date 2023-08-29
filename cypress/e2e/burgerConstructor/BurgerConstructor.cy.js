



describe('Тест бургер конструктора', () => {
    beforeEach(() => {
        cy.intercept('GET', '/ingredients', {fixture: 'ingredients.json'})
        cy.visit('http://localhost:3000');
    });


    it('Проверка конструктора и блока ингридиентов', () => {

        // cy.get(constructor).should('not.exist');
        cy.get('[class^=burger-constructor_list]').should('exist');
        cy.get('[class^=burger-ingredients_scrollDiv]').should('exist');

    })

    // it('Проверка модального окна', () => {

    //     // cy.get(constructor).should('not.exist');
    //     cy.get('[class^=burger-constructor_list]').should('exist');
    //     cy.get('[class^=burger-ingredients_scrollDiv]').should('exist');

    // })

    it('Проверка перетаскивания', () => {

        cy.get('[class^=ingredient_item]').should('exist').find('p').contains('Соус Spicy-X')
        cy.get(`[data-testid^="drag-item-3"]`).trigger('dragstart');
        cy.get('[class^=burger-constructor_list]').trigger('drop');
        cy.get('[class^=burger-constructor_nachBlock]').should('exist')
        cy.get('[class^=constructor-ingredient_item]').should('exist').find('span').contains('Соус Spicy-X')
        // cy.get('[class^=burger-ingredients_scrollDiv]').should('exist');
        
    })
})