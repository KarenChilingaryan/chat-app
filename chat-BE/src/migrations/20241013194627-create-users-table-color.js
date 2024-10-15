'use strict';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
