export const DbRelations = (models) => {
  models.user.hasMany(models.post, { sourceKey: 'id', foreignKey: 'userId' });
  models.post.belongsTo(models.user, { targetKey: 'id' });
};
