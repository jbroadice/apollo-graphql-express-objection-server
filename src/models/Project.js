const BaseModel = require('./BaseModel');

module.exports = class Project extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static async modifyApiQuery(qb, { user }) {
    if (user) {
      qb.where('ownerId', user.id);
    } else {
      qb.whereRaw('1=2');
    }
  }

  static get relationMappings() {
    return {
      owner: {
        relation: this.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'Project.ownerId',
          to: 'User.id',
        },
      },
    };
  }
};

