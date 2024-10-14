'use strict';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'color', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: generateRandomColor(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'color');
  },
};
