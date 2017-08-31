'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Likes",
      "userId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      "Likes",
      "messageId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Messages",
          key: "id"
      }
    }
  );
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Likes", "userId", "messageId");
  }
};
