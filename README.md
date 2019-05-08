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
chasemate
├── public
├── src
│   ├── components          Presentational React components
│   ├── containers          React components connected to the Redux state
│   ├── enums               Enumerable values
│   ├── helpers             Entity-specific helper methods, one file per entity
│   ├── images
│   ├── store               Redux store
│   │   └── modules         Store ducks, see https://github.com/erikras/ducks-modular-redux
│   ├── styles              Global stylesheets
│   ├── themes
│   ├── api.js              Back-end API
│   ├── constants.js        Shared constants
│   ├── index.js
│   ├── propTypes.js        Shared propTypes
│   ├── typedef.js          Type definitions for jsDocs
│   └── utils.js            Generic utilities
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierc
├── LICENSE
├── README.md
├── package-lock.json
└── package.json
```

## Built with

- [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React.js](https://reactjs.org/)
- [Redux.js](https://redux.js.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Material UI](https://material-ui.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://github.com/prettier/prettier)

## Acknowledgments

- Kudos to [Sam Herbert](https://github.com/SamHerbert/SVG-Loaders) for creating the loading spinner used in this project!

## Authors

**Kostas Karvounis** - [kael89](https://github.com/kael89)

## License

This project is licensed under the GNU General Public License v3.0
