import { RESOURCES } from '../../src/modules/api';
import { actionButton, results, setBoard } from '../support';

const { GET_TREE } = RESOURCES;

const defaultResponse = { data: {}, error: '' };

const checkForcedMateTreeResults = (board = {}, response = defaultResponse, appResults = []) => {
  cy.server();
  cy.route({
    method: 'GET',
    url: `**/${GET_TREE}?**`,
    response,
  }).as('forcedMateTree');

  cy.visit('/');
  setBoard(board);
  actionButton().click();
  cy.wait('@forcedMateTree');

  appResults.map(result =>
    results()
      .invoke('text')
      .should('contain', result),
  );
};

const checkResultsByFixture = fixture =>
  cy.fixture(fixture).then(({ board, response, appResults }) => {
    checkForcedMateTreeResults(board, response, appResults);
  });

context('Results', () => {
  it('should show results when there is a forced checkmate', () => {
    checkResultsByFixture('forcedMate.json');
  });

  it('should show results when there is a forced checkmate with promotions', () => {
    checkResultsByFixture('forcedMate_promotions.json');
  });

  it('should show an informative message when there are no forced checkmates', () => {
    checkResultsByFixture('forcedMate_emptyResults.json');
  });

  it('should show an error which is contained in the response', () => {
    const error = 'An error occurred';
    checkForcedMateTreeResults({}, { data: {}, error }, [error]);
  });

  it('should show an error when the server is not available', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: `**/${GET_TREE}?**`,
      status: 404,
    }).as('forcedMateTree');

    cy.visit('/');
    actionButton().click();
    cy.wait('@forcedMateTree');

    results()
      .invoke('text')
      .should('contain', 'Network error');
  });
});
