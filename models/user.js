'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.PetsList,{foreignKey:"openId"})
    }
  };
  // User.associate = function(models){
  //   // models.Article.hasMany(models.Comments,{foreignKey:'ArticleId'})
  //   models.User.hasMany(models.PetsList,{foreignKey:"openId"})
  // };
  User.init({
    realName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    nickName: DataTypes.STRING,
    acavater: DataTypes.STRING,
    area: DataTypes.STRING,
    address: DataTypes.STRING,
    cardType: DataTypes.INTEGER,
    cardCode: DataTypes.STRING,
    isIdention: DataTypes.INTEGER,
    identityImgs: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    openId: DataTypes.STRING,
    sessionKey: DataTypes.STRING,
    userCode: DataTypes.STRING,
    favorite: DataTypes.STRING,
    myApplyIds: DataTypes.STRING,
    myHelpIds: DataTypes.STRING,
    myGetApplyIds: DataTypes.STRING,
    myGetHelpIds: DataTypes.STRING,
    souqiId: DataTypes.STRING,
    job: DataTypes.STRING,
    company: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    deletedAt: 'destroyTime'
  });
  return User;
};