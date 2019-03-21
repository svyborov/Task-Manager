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
  });
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: 'creator',
      foreignKey: 'creatorId',
    });
    Task.belongsTo(models.User, {
      as: 'assignedTo',
      foreignKey: 'assignedToId',
    });
    Task.belongsTo(models.TaskStatus, {
      as: 'taskStatus',
      foreignKey: 'taskStatusId',
    });
  };
  return Task;
};
