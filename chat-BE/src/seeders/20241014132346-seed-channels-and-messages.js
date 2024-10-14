'use strict';

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alicePassword = await bcrypt.hash('alice$55', 10);
    const davidPassword = await bcrypt.hash('david$55', 10);
    const users = await queryInterface.bulkInsert('users', [
      { username: 'alice', fullName: 'Alice Wonderland', password: alicePassword, color: generateRandomColor(), createdAt: new Date(), updatedAt: new Date() },
      { username: 'david', fullName: 'David Copperfield', password: davidPassword, color: generateRandomColor(), createdAt: new Date(), updatedAt: new Date() },
    ], { returning: ['id'] });

    const aliceId = users[0].id;
    const davidId = users[1].id;

    const channels = [];
    for (let i = 1; i <= 5; i++) {
      channels.push({
        name: `Channel ${i}`,
        color: generateRandomColor(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const insertedChannels = await queryInterface.bulkInsert('channels', channels, { returning: ['id'] });

    const userChannels = insertedChannels.map((channel) => ({
      userId: aliceId,
      channelId: channel.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })).concat(insertedChannels.map((channel) => ({
      userId: davidId,
      channelId: channel.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));

    await queryInterface.bulkInsert('UserChannels', userChannels);

    for (let i = 0; i < insertedChannels.length; i++) {
      const channelId = insertedChannels[i].id;
      const messages = [];

      for (let j = 0; j < 100; j++) {
        const content = faker.lorem.sentence();
        const userId = j % 2 === 0 ? aliceId : davidId;
        const unread = j % 5 !== 0;
        const photo = j % 10 === 0 ? faker.image.avatar() : null;

        messages.push({
          content,
          userId,
          channelId,
          unread,
          photo,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await queryInterface.bulkInsert('messages', messages);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});
    await queryInterface.bulkDelete('UserChannels', null, {});
    await queryInterface.bulkDelete('channels', null, {});
    await queryInterface.bulkDelete('users', { username: ['alice', 'david'] }, {});
  }
};
