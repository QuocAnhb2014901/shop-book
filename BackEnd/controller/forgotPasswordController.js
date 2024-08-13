const User = require("../models/Users");
const sendMail = require("../helper/sendMail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });
    const { passwordReset } = user.createChangePasswordToken();
    await user.save();
    const mailOptions = {
      from: {
        name: "Vaccine",
        address: "Vaccine@gmail.com",
      }, // sender address
      to: user.email, // list of receivers
      subject: "Khôi phục mật khẩu", // Subject line
      html: `Bạn có thể đặt lại mật khẩu bằng liên kết sau:
        localhost:5173/reset-password?token=${passwordReset}`, // html body
    };
    sendMail(mailOptions);
  
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { forgotPassword };
