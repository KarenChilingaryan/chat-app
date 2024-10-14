'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('channels', 'color', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#FFFFFF', 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('channels', 'color');
  }
};
