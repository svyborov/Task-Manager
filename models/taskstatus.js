module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Cannot be empty"},
      },
    },
  }, {});
  TaskStatus.associate = (models) => {
    TaskStatus.hasOne(models.Task, { foreignKey: 'taskStatusId' });
  };
  return TaskStatus;
};
