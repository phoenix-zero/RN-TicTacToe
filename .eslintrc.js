module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "react/no-access-state-in-setstate": 0,
    "react/destructuring-assignment": 0,
    "max-len": 150
  },
  globals: {
    fetch: false
  }
};
