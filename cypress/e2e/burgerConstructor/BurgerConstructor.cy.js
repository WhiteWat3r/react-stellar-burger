



describe('Тест бургер конструктора', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });


    it('Проверка конструктора и блока ингридиентов', () => {
        cy.get('[class^=burger-constructor_list]').should('exist');
        cy.get('[class^=burger-ingredients_scrollDiv]').should('exist');

    })


    it('Проверка перетаскивания', () => {

        cy.get('[class^=ingredient_item]').find('p').contains('Соус Spicy-X')
        cy.get('[class^=constructor-ingredient_item]').should('not.exist')



        cy.get(`[data-testid^="drag-item-3"]`).trigger('dragstart');
        cy.get('[class^=burger-constructor_list]').trigger('drop');
        cy.get('[class^=constructor-ingredient_item]').find('span').contains('Соус Spicy-X')
        
    })

    
    it('Проверка модального окна', () => {
        cy.get(`[data-testid^="drag-item-3"]`).trigger('dragstart');
        cy.get('[class^=burger-constructor_list]').trigger('drop');

      
        cy.get(`[data-testid^="drag-item-0"]`).trigger('dragstart');
        cy.get('[class^=burger-constructor_list]').trigger('drop'); // опять перетаскиваем игредиенты 


        cy.get('button').click()


        cy.get('[class^=input__container]').first().type('goirkopf@gmail.com')
        cy.get('[class^=input__container]').last().type('1337') // авторизация

        cy.get('button').click().wait(3000)


        cy.get('button').click()

        cy.get('[class^=order-details_modal]').should('exist') // модалка


        cy.get('[class^=order-details_title]', { timeout: 17000 });        
    })
})