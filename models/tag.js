export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  Tag.associate = (models) => {
    Tag.hasMany(models.TagsToTasks, {
      foreignKey: 'tagId',
    });
  };
  return Tag;
};
