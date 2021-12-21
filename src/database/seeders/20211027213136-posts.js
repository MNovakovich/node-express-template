'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const data = []
    for (let i = 0; i < 30; i++) {
      data.push({
        title: faker.company.companyName(),
        content: 'test',
        user_id: faker.random.number({ min: 1, max: 10 }),
        created_at: new Date()
      })
    }

    return queryInterface.bulkInsert('posts', data, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('posts', null, {});
  }
};
