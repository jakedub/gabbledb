'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Messages",
      "userId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Todos", "userId");
  }
};
