'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    like: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Like.belongsTo(models.User, {foreignKey: 'userId'})
        Like.belongsTo(models.Message, {foreignKey: 'messageId'})
      }
    }
  });
  return Like;
};
