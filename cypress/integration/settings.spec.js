import { RESOURCES } from '../../src/modules/api';
import { actionButton, setting } from '../support';

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
    beforeEach(() => {
      setting('moveDepth').as('moveDepthSetting');
      cy.get('@moveDepthSetting')
        .find('input')
        .as('moveDepthInput');
    });

    specify('the default move depth should be 2', () => {
      cy.get('@moveDepthSetting')
        .invoke('text')
        .should('be', '2');
    });

    specify('user can set the move depth', () => {
      cy.get('@moveDepthInput').should('not.be.disabled');
    });
  });
});
