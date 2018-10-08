const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static async modifyApiQuery(qb, { user }) {
    console.log('modifyApiQuery', { user });
    if (user) {
      qb.where('id', user.id);
    } else {
      qb.whereRaw('1=2');
    }
  }

  static get relationMappings() {
    return {
      projects: {
        relation: this.HasManyRelation,
        modelClass: 'Project',
        join: {
          from: 'User.id',
          to: 'Project.ownerId',
        },
      },
    };
  }
};

