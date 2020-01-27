

const Model = require('./mongoModel');
const schema = require('./categorySchema');
/**
 * @class
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
