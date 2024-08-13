import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryPost } from "../../../redux/categoryPostSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./loading.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  name: yup.string().email().required("Vui lòng nhập tên danh mục!"),
});

function AddCategoryPost() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const isLoading = useSelector((state) => state.categoryPost.isLoading);

  // Xử lý khi người dùng submit form
  const onSubmit = (data) => {
    dispatch(addCategoryPost(data));
  };

  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] mx-auto p-4 bg-gray-100 h-max mt-40 rounded-lg shadow"
      >
        <h1 className=" text-2xl font-bold text-center pb-4">
          Thêm danh mục bài viết
        </h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
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
        <a href="/CategoryPostManagement">Quay Lại</a>
      </form>
    </div>
  );
}

export default AddCategoryPost;
