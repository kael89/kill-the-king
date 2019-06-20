import { themeSwitch } from '../support';

const getAppBackgroundColor = () => Cypress.$('body').css('background-color');

context('Theme', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  specify('user should be able to switch theme', () => {
    const originalBgColor = getAppBackgroundColor();

    themeSwitch()
      .find('input')
      .check()
      .then(() => {
        const newBgColor = getAppBackgroundColor();
        cy.wrap(newBgColor).should('not.be.equal', originalBgColor);
      });
  });
});
