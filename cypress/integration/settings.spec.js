import { RESOURCES } from '../../src/modules/api';
import { actionButton, selectInput, setting } from '../support';

const { GET_TREE } = RESOURCES;

const assertQueryParam = (requestSelector, paramName, paramValue) => {
  cy.wait(requestSelector).then(({ url }) => {
    const queryParams = new URLSearchParams(url);
    cy.wrap(queryParams.get(paramName)).should('equal', paramValue);
  });
};

context('Settings', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: `**/${GET_TREE}?**`,
      response: {},
      status: 200,
    }).as('forcedMateTree');

    cy.visit('/');
  });

  describe('starting color', () => {
    beforeEach(() => {
      setting('startingColor').as('startingColorSetting');
      cy.get('@startingColorSetting')
        .find('input')
        .as('startingColorInput');
    });

    specify('user can set the starting color to white', () => {
      cy.get('@startingColorInput').uncheck();
      cy.get('@startingColorInput').check();

      actionButton().click();
      assertQueryParam('@forcedMateTree', 'startingColor', 'white');
    });

    specify('user can set the starting color to black', () => {
      cy.get('@startingColorInput').uncheck();

      actionButton().click();
      assertQueryParam('@forcedMateTree', 'startingColor', 'black');
    });

    specify('the default starting color should be "white"', () => {
      cy.get('@startingColorSetting')
        .invoke('text')
        .should('match', /white/i);

      actionButton().click();
      assertQueryParam('@forcedMateTree', 'startingColor', 'white');
    });
  });

  describe('move depth', () => {
    it('should have only [1, 2] as available options', () => {
      cy.openSelectMenu('moveDepth')
        .find('li')
        .then($liItems => {
          const options = $liItems.map((i, $li) => Cypress.$($li).text()).get();
          cy.wrap(options).should('deep.equal', ['1', '2']);
        });
    });

    specify('user can set the move depth', () => {
      cy.openSelectMenu('moveDepth')
        .contains('1')
        .click();

      actionButton().click();
      assertQueryParam('@forcedMateTree', 'depth', '2');
    });

    specify('the default move depth should be 2', () => {
      selectInput('moveDepth')
        .invoke('text')
        .should('equal', '2');

      actionButton().click();
      assertQueryParam('@forcedMateTree', 'depth', '4');
    });
  });
});
