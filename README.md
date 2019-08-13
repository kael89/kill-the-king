# Chasemate UI

Front-end of https://chasemate.app/

Back-end repository: [chasemate](https://github.com/kael89/chasemate)

## Features

- Available Moves viewer
- Move History
- Board import/export
- Light/Dark themes

## Installation

### Run the app locally

1. Add a `.env` file under the project's directory (see `.env.example`). `REACT_APP_API_URL` should be the base url under which our back-end APIs are served
2.

```
npm install
npm run start
```

The application should now be running at http://localhost:3000

## Project structure

```
chasemate-ui
├── cypress                 https://www.cypress.io end-to-end tests
│   ├── fixtures
│   ├── integration         Test home folder
│   ├── plugins
│   ├── support             Custom commands and helper methods
├── public
├── src
│   ├── components          React components
│   ├── images
│   ├── modules             Entity-specific methods
│   ├── store               Redux store
│   ├── styles              Global stylesheets
│   ├── themes
│   ├── constants.js        Shared constants
│   ├── propTypes.js        Shared propTypes
│   ├── typedef.js          jsDoc type definitions
│   └── utils.js            Generic utilities
```

## Built with

- [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React.js](https://reactjs.org/)
- [Redux.js](https://redux.js.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://github.com/prettier/prettier)
- [Material UI](https://material-ui.com/)
- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)

## Acknowledgments

- Kudos to [Sam Herbert](https://github.com/SamHerbert/SVG-Loaders) for creating the loading spinner used in this project!

## Authors

**Kostas Karvounis** - [kael89](https://github.com/kael89)

## License

This project is licensed under the GNU General Public License v3.0
