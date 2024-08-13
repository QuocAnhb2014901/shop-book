import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getVaccineById, updateVaccine } from "../../../redux/vaccineSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../../Nav/Sidebar";
import { getCategory } from "../../../redux/categorySlice";
import "./loading.css";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
});

const EditVaccin = () => {
  const category = useSelector((state) => state.category.category);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const isLoading = useSelector((state) => state.vaccine.isLoading);
  const [selectedSize, setSelectedSize] = useState([]);
  const [imageUpload, setImageUpload] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVaccineById(id));
    dispatch(getCategory());
  }, [dispatch, id]);

  useEffect(() => {
    if (vaccine && typeof vaccine.size === "string") {
      setSelectedSize(vaccine.size.split(","));
    }
  }, [vaccine]);

  const handleToggleSize = (size) => {
    if (selectedSize.includes(size)) {
      setSelectedSize(selectedSize.filter((s) => s !== size));
    } else {
      setSelectedSize([...selectedSize, size]);
    }
  };

  const handleSelectImage = async (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleEditVaccine = (data) => {
    const { name, description, category, price } = data;
    dispatch(
      updateVaccine({
        id,
        name,
        description,
        size: selectedSize.join(","), // Join selected sizes into a string
        category,
        price,
        image: imageUpload ? imageUpload : vaccine.image,
      })
    ).then(() => {
      Swal.fire({
        title: "Success",
        text: "Product updated successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/admin/vaccines");
      });
    });
  };

  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <div className="container flex justify-center overflow-y-scroll p-4">
        <div className="h-max w-full max-w-[60rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <h1 className="font-bold text-2xl text-center mb-9">
            Cập nhật Sản Phẩm
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleEditVaccine)}
            className="w-full max-w-[60rem]"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tên sản phẩm:
              </label>
              <input
                name="name"
                type="text"
                placeholder="Hãy nhập tên sản phẩm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.name}
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="text-lg text-gray-600">
                Giá
              </label>
              <input
                name="price"
                type="text"
                placeholder="Hãy nhập giá"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.price}
                {...register("price")}
              />
              <p className="text-red-500 mt-1">{errors.price?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="text-lg text-gray-600">
                Chọn Size:
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <div
                    key={size}
                    className={`border p-2 cursor-pointer size-item ${selectedSize.includes(size) ? 'border-primary' : ''}`}
                    onClick={() => handleToggleSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-sm text-gray-600">
                Danh mục
              </label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.category}
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
              <label htmlFor="image" className="text-lg text-gray-600">
                Hình ảnh:
              </label>
              {vaccine?.image && (
                <img
                  src={vaccine.image}
                  alt="Vaccine"
                  className="w-[200px] h-[100px] p-2"
                />
              )}
              <input
                type="file"
                {...register("image")}
                onChange={handleSelectImage}
              />
              <p className="text-red-500 mt-1">{errors.image?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-lg text-gray-600">
                Mô tả
              </label>
              <textarea
                name="description"
                placeholder="Nhập mô tả"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={vaccine?.description}
                {...register("description")}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>
            <button
              className="h-10 w-20 rounded-sm bg-slate-200"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVaccin;
