import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CardBody,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOther, updateStatusOder } from "../../../redux/otherSlice";
import "../cruds/loading.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const TABLE_HEAD = [
  "ID",
  "Thời gian đặt",
  "Tên người nhận",
  "Số điện thoại",
  "Địa chỉ",
  "Ghi chú",
  "Trạng thái",
  "",
  "",
];

const OtherManagement = () => {
  const dispatch = useDispatch();
  const other = useSelector((state) => state.other.other);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getOther());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateStatus = (id) => {
    Swal.fire({
      title: "Cập nhật trạng thái",
      input: "select",
      inputOptions: {
        "Chưa xử lý": "Chưa xử lý",
        "Đang xử lý": "Đang xử lý",
        "Đã hoàn thành": "Đã hoàn thành",
      },
      inputPlaceholder: "Chọn trạng thái",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id,
          status: result.value,
        };
        dispatch(updateStatusOder(data));
      }
    });
  };

  return (
    <div className="content-wrapper">
      <Card className="ml-2 w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="content-header rounded-none"
        >
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Hóa Đơn Thanh Toán</h1>
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
            </div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
              table="otherTable"
              filename="hoadon"
              sheet="hoadon"
              buttonText="Xuất Excel"
            />
          </div>
        </CardHeader>
        <CardBody className="container-fluid px-0 ">
          <table id="otherTable" className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-blue-800 text-white">
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
              {other
                .filter(
                  (item) =>
                    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.phone_number.includes(searchTerm)
                )
                .map(
                  (
                    { _id, createdAt, username, phone_number, address, note, status },
                    index
                  ) => {
                    const isLast = index === other.length - 1;
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
                            {new Date(createdAt).toLocaleDateString("en-GB")}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {username}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone_number}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {address}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {note}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
                            onClick={() => handleUpdateStatus(_id)}
                          >
                            Cập nhật
                          </button>
                        </td>
                        <td className={classes}>
                          <Link to={`/otherdetails/${_id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                              Chi tiết
                            </button>
                          </Link>
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
  );
};

export default OtherManagement;

