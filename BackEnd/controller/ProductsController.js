const Vaccine = require("../models/Product");

const addVaccine = async (req, res) => {
  const image = req.file.path;
  console.log(req.body);
  const { name, description, size, category, price } = req.body;
  try {
    const vaccine = new Vaccine({
      name,
      description,
      size,
      category,
      image,
      price,
    });
    await vaccine.save();
    // update Storage

    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVaccine = async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryStr = JSON.stringify(queries);
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

  try {
    const vaccine = await Vaccine.find(JSON.parse(queryStr));
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVaccine = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findByIdAndDelete(id);
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVaccine = async (req, res) => {
  const { id } = req.params;
  // neu khong co image thi lay image cu
  let image = req.file ? req.file.path : req.body.image;
  const { name, description, size, category, price } = req.body;
  try {
    const vaccine = await Vaccine.findByIdAndUpdate(id, {
      name, 
      description, 
      size, 
      category,
      price,
      image
    }, { new: true }); 
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVaccineById = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findById(id);
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVaccine,
  getVaccine,
  deleteVaccine,
  updateVaccine,
  getVaccineById,
};
