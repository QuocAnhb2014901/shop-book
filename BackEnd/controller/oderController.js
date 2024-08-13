const OtherVaccine = require("../models/otherProduct");
const addOtherVaccine = async (req, res) => {
  const { username, phone_number, address, note, cart, userId, status } =
    req.body;
  try {
    const otherVaccine = new OtherVaccine({
      username,
      phone_number,
      address,
      cart,
      note,
      userId,
      status,
      
    });
    await otherVaccine.save();
    res.status(200).json({ otherVaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOtherVaccine = async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryStr = JSON.stringify(queries);
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

  try {
    const otherVaccine = await OtherVaccine.find(JSON.parse(queryStr));
    res.status(200).json({ otherVaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOtherById = async (req, res) => {
  try {
    const otherVaccine = await OtherVaccine.findById(req.params.id);
    res.status(200).json({ otherVaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatusOder = async (req, res) => {
  try {
    const { id, status } = req.body;
    const otherVaccine = await OtherVaccine.findByIdAndUpdate(id, {
      status,
    });
    res.status(200).json({ otherVaccine });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addOtherVaccine,
  getOtherVaccine,
  getOtherById,
  updateStatusOder,
};
