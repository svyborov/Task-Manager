export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Task, {
      through: 'TagsToTasks',
      as: 'posts',
      foreignKey: 'tagId',
    });
  };
  return Tag;
};
