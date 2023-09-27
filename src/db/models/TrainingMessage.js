export default (sequelize, DataTypes) => {
  const TrainingMessage = sequelize.define(
    'TrainingMessage',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      messages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      tags: {
        type: DataTypes.JSON,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return TrainingMessage;
};
