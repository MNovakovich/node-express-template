export const DbRelations = (models) => {
  models.user.hasMany(models.post, { sourceKey: 'id', foreignKey: 'userId' });
  models.post.belongsTo(models.user, { targetKey: 'id' });

  // Post Tag
  models.post.belongsToMany(models.tag, { through: 'post_tag' });
  // models.tag.belongsToMany(models.post, { through: models.post_tag });
};
