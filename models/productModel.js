const Model = require('./mongoModel');
const schema = require('./productSchema');
/**
 * @class
 */
class Product extends Model {
  constructor() {    
    super(schema);
  }
}

module.exports = Product;
