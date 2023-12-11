'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Transactional.hasOne(models.Testimonial)
    }
  }
  Transactional.init({
    order_id: DataTypes.STRING,
    gross_amount: DataTypes.STRING,
    transaction_time: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    email:DataTypes.STRING,
    isTestimonial:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transactional',
  });
  return Transactional;
};