'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.UserLocation);
  };
  return Location;
};
