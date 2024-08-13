const Category = require("../models/Category");

const addCategory = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const category = new Category({
      name,
      slug,
    });
    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { name, slug, id } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, {
      name,
      slug,
    });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCategory, getCategory, deleteCategory, updateCategory };
