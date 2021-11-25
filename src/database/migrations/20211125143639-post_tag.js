'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('posts_tags', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'post_id',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'tag_id',
        allowNull: false,
        // primaryKey: true,
        references: {
          model: 'tags',
          key: 'id'
        }
      },

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts_tags');
  }
};
