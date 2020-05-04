const User = require('./user')
const Review = require('./review')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderitem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Review)
// User.hasMany(Order)
Review.belongsTo(User)
Review.belongsTo(Product)

//User to Order relationship
Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
})

//OrderDetail to Order
OrderItem.belongsTo(Order, {
  foreignKey: {
    allowNull: false,
  },
})

OrderItem.belongsTo(Product, {
  foreignKey: {
    allowNull: false,
  },
})

Product.belongsTo(Category)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  Order,
  OrderItem,
  Product,
  Category,
}
