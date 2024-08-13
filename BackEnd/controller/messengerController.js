const Messenger = require("../models/messenger");
const User = require("../models/Users");
const addMessenger = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  if (!sender || !receiver) {
    res.status(400).json("User not found");
  }
  try {
    const newMessenger = new Messenger({
      sender: senderId,
      receiver: receiverId,
      message,
    });
    const savedMessenger = await newMessenger.save();
    res.status(200).json(savedMessenger);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessenger = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;
  console.log(senderId, receiverId);
  const messenger = await Messenger.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  }).sort({ createdAt: 1 });
  try {
    res.status(200).json(messenger);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessengerBySender = async (req, res) => {
  const senderId = req.query.senderId;
  const messenger = await Messenger.find({ sender: senderId });
  try {
    res.status(200).json(messenger);
  } catch (error) {
    res.status(500).json(error);
  }
};

// lấy đoạn chat giữa 2 người
const getMessengerBySenderAndReceiver = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;
  const messenger = await Messenger.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });
  try {
    res.status(200).json(messenger);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMessenger = async (req, res) => {
  const { id } = req.params;
  try {
    await Messenger.findByIdAndDelete(id);
    res.status(200).json("Messenger has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addMessenger,
  getMessenger,
  deleteMessenger,
  getMessengerBySender,
  getMessengerBySenderAndReceiver,
};
