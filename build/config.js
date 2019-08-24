const path = require('path');

module.exports = {
  basePath: '',
  resolve: (...rest) => path.join(...rest)
};
