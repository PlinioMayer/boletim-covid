const { useBabelRc, override } = require('customize-cra')

module.exports = override(
  useBabelRc() // eslint-disable-line
);