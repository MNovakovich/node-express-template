'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.createTable('todo', { id: Sequelize.INTEGER });
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('todo');
  
  }
};
