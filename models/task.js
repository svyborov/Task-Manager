export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    taskStatusId: {
      type: DataTypes.INTEGER,
    },
    creatorId: {
      type: DataTypes.INTEGER,
    },
    assignedToId: {
      type: DataTypes.INTEGER,
    },
  }, {
    scopes: {
      filterByTaskStatusId: id => ({
        where: {
          taskStatusId: id,
        },
      }),
      filterByAssignedToId: id => ({
        where: {
          assignedToId: id,
        },
      }),
      filterByCreatorId: id => ({
        where: {
          creatorId: id,
        },
      }),
    },
  });
  Task.associate = (models) => {
    Task.belongsTo(models.User, { as: 'creator', foreignKey: 'creatorId' });
    Task.belongsTo(models.User, { as: 'assignedTo', foreignKey: 'assignedToId' });
    Task.belongsTo(models.TaskStatus, { as: 'taskStatus', foreignKey: 'taskStatusId' });
    Task.belongsToMany(models.Tag, { through: 'TagsToTasks',  foreignKey: 'taskId' });
    Task.addScope('Assotiations', { include: ['creator', 'assignedTo', 'taskStatus', 'Tags']});
    Task.addScope('filterByTagsIds', tagsIds => ({
      include: [
        {
          model: models.Tag,
          where: {
            id: {
              [sequelize.Op.in]: tagsIds,
            },
          },
        },
      ],
    }));
  };
  return Task;
};
