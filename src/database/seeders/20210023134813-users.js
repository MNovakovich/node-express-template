'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const data = [
      {
        email: 'marko.novakovic@mail.ru',
        password: bcrypt.hashSync("1111111", 10),
        created_at: new Date(),
      }
    ]
    for (let i = 0; i < 30; i++) {
      data.push({
        email: faker.internet.email(),
        password: bcrypt.hashSync("1111111", 10),
        created_at: new Date()
      })
    }

    return queryInterface.bulkInsert('users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
