import { setting } from '../support';

context('Settings', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('starting player', () => {
    beforeEach(() => {
      setting('startingPlayer').as('startingPlayerSetting');
      cy.get('@startingPlayerSetting')
        .find('input')
        .as('startingPlayerInput');
    });

    specify('the default starting player should be "white"', () => {
      cy.get('@startingPlayerSetting')
        .invoke('text')
        .should('match', /white/i);
      cy.get('@startingPlayerInput').should('be.checked');
    });

    specify('user can set the starting player', () => {
      cy.get('@startingPlayerInput').should('not.be.disabled');
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
