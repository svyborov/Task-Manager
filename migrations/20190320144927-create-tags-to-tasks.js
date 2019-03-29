module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TagsToTasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    taskId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tasks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    tagId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('TagsToTasks'),
};
