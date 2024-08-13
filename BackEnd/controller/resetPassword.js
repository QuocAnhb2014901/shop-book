const User = require("../models/Users");

const verifyPasswordToken = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    console.log(token);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(user);
    if (!user)
      return res.status(400).json({
        message: "Mã token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại",
      });

    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpires = undefined),
      (user.password = password);
    await user.save();
    console.log("cập nhật thành công");

    return res.status(200).json({ message: "cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { verifyPasswordToken };
