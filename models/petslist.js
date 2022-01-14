'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetsList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PetsList.associate = function(models){
    // models.Article.hasMany(models.Comments,{foreignKey:'ArticleId'})
  };
  PetsList.init({
    openId: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    image: DataTypes.STRING,
    adoptionRequirements: DataTypes.STRING,
    breed: DataTypes.INTEGER,
    hairColor: DataTypes.INTEGER,
    description: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    type: DataTypes.INTEGER,
    repellent: DataTypes.INTEGER,
    vaccine: DataTypes.INTEGER,
    sterilize: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    hairType: DataTypes.INTEGER,
    source: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PetsList',
    paranoid: true,
    deletedAt: 'destroyTime'
  });
  return PetsList;
};