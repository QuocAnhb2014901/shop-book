import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./loading.css";
import { addVaccine } from "../../../redux/vaccineSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../../../redux/categorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  price: yup.string().required("Vui lòng nhập giá"),
});

const Addvaccin = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [description, setDescription] = useState("");
  const availableSizes = ["Tập 1", "Tập 2"];
  const [selectedSize, setSelectedSize] = useState([]);
  const isLoading = useSelector((state) => state.vaccine.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const category = useSelector((state) => state.category.category);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/login");
    }
  }, [user.role]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleUploadImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleAddSize = (size) => {
    setSelectedSize([...selectedSize, size]);
  };

  const handleAddVaccine = async (data) => {
    const { name, address, category, price } = data;

    await dispatch(
      addVaccine({
        name,
        size: selectedSize,
        address,
        category,
        description: description,
        price,
        image: imageUpload,
      })
    );
  };

  return (
    <div className=" flex h-[100vh]">
      <Sidebar />
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Sản Phẩm</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddVaccine)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sản phẩm:
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Hãy nhập tên sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Giá sản phẩm:
              </label>
              <input
                name="price"
                type="text"
                id="price"
                placeholder="Hãy nhập giá sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("price")}
              />
              <p className="text-red-500 mt-1">{errors.price?.message}</p>
            </div>

            {/* <div className="flex gap-2 items-center">
              {availableSizes.map((size) => (
                <div
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`border p-2 cursor-pointer size-item ${
                    selectedSize === size ? "active border-primary" : ""
                  }`}
                >
                  {size}
                </div>
              ))}
            </div> */}
            <div className="flex gap-2 items-center mt-2">
              <label htmlFor="name" className="text-sm text-gray-600">
                Chọn Tập:
              </label>
              {selectedSize.map((size) => (
                <div
                  key={size}
                  className="border p-2 cursor-pointer size-item active border-primary"
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center mt-2">
              <button
                type="button"
                onClick={() => handleAddSize("Tập 1")}
                className="border p-2 cursor-pointer size-item"
              >
                Thêm Tập 1
              </button>
              <button type="button" onClick={() => handleAddSize("Tập 2")}>
                Thêm Tập 2
              </button>
              {/* <button type="button" onClick={() => handleAddSize("L")}>
                Thêm L
              </button>
              <button type="button" onClick={() => handleAddSize("XL")}>
                Thêm XL
              </button> */}
            </div>

            <div className="mb-4">
              {/* danh muc */}
              <label htmlFor="origin" className="text-sm text-gray-600">
                Danh muc
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                name="category"
                {...register("category")}
              >
                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-sm text-gray-600">
                Hình ảnh:
              </label>
              <input
                {...register("image")}
                type="file"
                onChange={handleUploadImage}
              />
              <p className="text-red-500 mt-1">{errors.file?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm text-gray-600">
                Mô tả:
              </label>
              {/* <textarea
              name="description"
              id="description"
              className="w-full h-32 border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent resize-none  focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter description"
              {...register("description")}
            /> */}
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={Addvaccin.modules}
                formats={Addvaccin.formats}
                placeholder="Write something..."
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>

            <button className="block w-full h-10 bg-blue-800 text-white rounded-md">
              Thêm
            </button>
            <a href="/VaccineManagement">quay lại</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addvaccin;
