'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.associate = function(models){
    models.Article.hasMany(models.Comments,{foreignKey:'ArticleId'})
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    readNum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
    paranoid: true,
    deletedAt: 'destroyTime'
  });
  return Article;
};