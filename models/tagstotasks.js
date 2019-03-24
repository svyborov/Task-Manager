export default (sequelize, DataTypes) => {
  const TagsToTasks = sequelize.define('TagsToTasks', {
    taskId: {
      type: DataTypes.INTEGER,
    },
    tagId: {
      type: DataTypes.INTEGER,
    },
  });
  TagsToTasks.associate = (models) => {
    TagsToTasks.belongsTo(models.Task, { foreignKey: 'taskId' });
    TagsToTasks.belongsTo(models.Tag, { foreignKey: 'tagId' });
  };
  return TagsToTasks;
};
