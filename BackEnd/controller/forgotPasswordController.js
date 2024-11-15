const User = require("../models/Users");
const sendMail = require("../helper/sendMail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const { passwordReset } = user.createChangePasswordToken(); // Create token for resetting password
    await user.save(); // Save the token to the user document

    const resetLink = `http://localhost:5173/reset-password?token=${passwordReset}`; // The reset password link

    const mailOptions = {
      from: {
        name: "Vaccine",
        address: "Vaccine@gmail.com",
      }, // sender address
      to: user.email, // list of receivers
      subject: "Khôi phục mật khẩu", // Subject line
      html: `
        <p>Bạn có thể đặt lại mật khẩu bằng liên kết sau:</p>
        <a href="${resetLink}">
          <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
            Đặt lại mật khẩu
          </button>
        </a>
        <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
      `, // HTML body with the reset link
    };

    await sendMail(mailOptions); // Send the email

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { forgotPassword };
