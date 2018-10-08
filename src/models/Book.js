const BaseModel = require('./BaseModel');

module.exports = class Book extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
        author: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
};

