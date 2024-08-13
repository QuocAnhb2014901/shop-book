const User = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  // neu co file thi lay file khong thi lay avatar cu
  const avatar = req.file ? req.file.path.replace(/\\/g, "/") : req.body.avatar;
  const { username, email, phone, address, age, gender } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        phone,
        address,
        age,
        gender,
        avatar,
      },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const { id, role } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    role,
  });
  res.status(200).json({ user });
};

const wishListProduct = async (req, res) => {
  const { id, productId } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    $push: { wishList: productId },
  });
  res.status(200).json({ user });
};

const getWishListProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("wishList");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUsers,
  updateUser,
  getUserById,
  updateRole,
  wishListProduct,
  getWishListProduct,
};
