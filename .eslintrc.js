module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "Airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "space-infix-ops": 0,
    "indent": [
      "error",
      2
    ],
    "linebreak-style":0,
    "quotes": [
      "error",
      "single"
    ],
    "semi": 1
  }
};
