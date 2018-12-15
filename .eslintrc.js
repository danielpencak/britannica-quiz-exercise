module.exports = {
  "extends": [
    "ryansobol/es6",
    "ryansobol/mocha",
    "ryansobol/node"
  ],
  "plugins": [
    "standard",
    "promise",
    "react"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "impliedStrict": true,
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  }
};
