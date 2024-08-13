const Product = require("../models/Product");
const Comment = require("../models/Comment");
const Order = require("../models/otherProduct");
const Users = require("../models/Users");

const statistical = async (req, res) => {
  try {
    const totalUsers = await Users.find({});
    console.log(totalUsers)
    const totalProducts = await Product.find({});
    const totalComments = await Comment.find({});
    const totalOrders = await Order.find({});

    res.json({
      totalUsers:totalUsers.length,
      totalProducts:totalProducts.length,
      totalComments:totalComments.length,
      totalOrders:totalOrders.length,
    }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  statistical
};
