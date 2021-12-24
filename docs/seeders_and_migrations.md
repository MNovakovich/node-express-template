### Seed many to many

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await queryInterface.sequelize.query(
      'select id from users',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const roleIds = await queryInterface.sequelize.query(
      'select id from roles',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const data = [];
    if (!userIds || userIds.length == 0)
      return console.log('users not instanced');
    userIds.forEach((user) => {
      const randomRole = roleIds[Math.floor(Math.random() * roleIds.length)];
      data.push({ user_id: user.id, role_id: randomRole.id });
    });
    await queryInterface.bulkInsert('user_roles', data, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
```
