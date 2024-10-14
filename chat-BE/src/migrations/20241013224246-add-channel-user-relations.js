'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserChannels', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      channelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'channels',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    const tableDescription = await queryInterface.describeTable('messages');
    
    if (!tableDescription.channelId) {
      await queryInterface.addColumn('messages', 'channelId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'channels',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
    }

    if (!tableDescription.userId) {
      await queryInterface.addColumn('messages', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserChannels');

    await queryInterface.removeColumn('messages', 'channelId');
    await queryInterface.removeColumn('messages', 'userId');
  }
};
