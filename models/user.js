import { encrypt } from '../lib/secure';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {args: true, msg: "That doesn't look like an email address…"},
      },
    },
    passwordDigest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      set(value) {
        this.setDataValue('passwordDigest', encrypt(value));
        this.setDataValue('password', value);
        return value;
      },
      validate: {
        len: {args: [1, +Infinity], msg: "Password must be at least 2 characters."},
      },
    },
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Task, { as: 'CreatedTasks', foreignKey: 'creatorId' });
    User.hasOne(models.Task, { as: 'AssignedToTask', foreignKey: 'assignedToId' });
  };
  return User;
};
