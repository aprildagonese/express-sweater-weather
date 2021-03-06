'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('UserLocation', {
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {});
  UserLocation.associate = function(models) {
    UserLocation.belongsTo(models.User);
    UserLocation.belongsTo(models.Location);
  };
  return UserLocation;
};
