'use strict';
export default  {
  up: (queryInterface:any, Sequelize:any) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        
  },

  down: (queryInterface:any, Sequelize:any) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      
    */
      return queryInterface.dropTable('users');
  }
};
