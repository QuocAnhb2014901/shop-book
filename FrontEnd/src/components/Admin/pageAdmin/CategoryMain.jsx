import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../../redux/categorySlice";
import "../cruds/loading.css";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["id", "Tên Danh Mục", "slug", "Ngày Tạo", "Ngày Sửa", ""];



const CategoryMain = () => {
  const category = useSelector((state) => state.category.category);
  const isLoading = useSelector((state) => state.category.isLoading);
  console.log(category);
  const dispatch = useDispatch();
    // Tạo state để lưu từ khóa tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");

    // Hàm để cập nhật từ khóa tìm kiếm khi người dùng nhập vào input
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };
  return (
    <div className="content-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="flex">

        <Card className="ml-2 w-full">
          <CardHeader floated={false} shadow={false} className="content-header rounded-none">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl ml-6">
                <h1>Quản Lý Danh Mục</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="flex items-center gap-5 w-[350px] h-[40px] border border-gray-200 rounded-lg py-3 px-5">
                <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch}
          />
                  <span className="flex-shrink-0 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div className=" mb-2 h-14">
                  <Link to="/addCategory">
                    <Button className="flex items-center gap-1 rounded-md h-11 bg-blue-500 w-29 hover:bg-blue-600 text-md">
                      <PlusIcon className="h-7 w-7 " />
                      Thêm
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0 container-fluid ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className=" bg-blue-800 text-white">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                { category.length > 0 &&
                category
              .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(
                    ({ _id, name, slug, createdAt, updatedAt }, index) => {
                      const isLast = index === category.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {_id}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {slug}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {
                                (createdAt = new Date(
                                  createdAt
                                ).toLocaleDateString("en-GB"))
                              }
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {
                                (updatedAt = new Date(
                                  updatedAt
                                ).toLocaleDateString("en-GB"))
                              }
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              onClick={() => {
                                Swal.fire({
                                  title: "Update Danh mục",
                                  html: `
                                    <input
                                      id="slug"
                                      class="swal2-input"
                                      placeholder="Slug"
                                    >
                                    <br />
                                  <input
                                      id="name"
                                      class="swal2-input"
                                      placeholder="Tên Danh Mục"
                                      type="text"
                                    >
                                  
                                  `,
                                  showCancelButton: true,
                                  confirmButtonText: "Cập Nhật",
                                  cancelButtonText: "Hủy",
                                  preConfirm: () => {
                                    const slug =
                                      Swal.getPopup().querySelector(
                                        "#slug"
                                      ).value;
                                    const name =
                                      Swal.getPopup().querySelector(
                                        "#name"
                                      ).value;
                                    let id = _id;
                                    const data = { slug, name, id };
                                    dispatch(updateCategory({ data }));
                                  },
                                });
                              }}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-lg h-[50px] w-[50px] mr-2"
                            >
                              <span>
                                <PencilSquareIcon className="h-4 w-4" />
                              </span>
                              <span>Sửa</span>
                            </Button>
                            <Button
                              onClick={() => handleDelete(_id)}
                              className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-[50px] w-[50px]"
                            >
                              <span>
                                <TrashIcon className="h-4 w-4" />
                              </span>
                              <span>Xóa</span>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CategoryMain;
