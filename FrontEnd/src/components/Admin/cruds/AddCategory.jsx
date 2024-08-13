import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../redux/categorySlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./loading.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  slug: yup.string().required("Vui lòng nhập mã số!"),
  name: yup.string().required("Vui lòng nhập tên danh mục!"),
});

function AddCategory() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isLoading = useSelector((state) => state.category.isLoading);

  // Xử lý khi người dùng submit form
  const onSubmit = (data) => {
    dispatch(addCategory(data));
  };

  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] mx-auto p-4 bg-gray-100 h-96 mt-40 rounded-lg shadow"
      >
        <h1 className=" text-lg font-bold text-center pb-4">Thêm danh mục</h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mã số
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700"
            {...register("slug")}
          />
          <p className="text-red-500 mt-1">{errors.slug?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên danh mục:
          </label>

          <div>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none text-gray-700`}
              {...register("name")}
            />
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Thêm
          </button>
        </div>
        <a href="/category">Quay Lại</a>
      </form>
    </div>
  );
}

export default AddCategory;
