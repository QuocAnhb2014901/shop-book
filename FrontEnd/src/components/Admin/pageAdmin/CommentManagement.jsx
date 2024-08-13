
import {
  TrashIcon,
} from "@heroicons/react/24/solid";
import { CardBody, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../cruds/loading.css";
import { getComment } from "../../../redux/commentSlice";
const TABLE_HEAD = [
  "id",
  "Tên",
  "Tên vắc-xin",
  "Nội dung",
  "Ngày đăng",
  "",
];
const CommentManagement = () => {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state.comment.comment);
  console.log(comment);
  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);
  return (
    <div className="content-wrapper">

      <Card className="ml-2 w-full">
        <CardHeader floated={false} shadow={false} className="content-header rounded-none">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Bình Luận</h1>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
              
            </div>
          </div>
        </CardHeader>
        <CardBody className="container-fluid px-0">
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
              {comment.length > 0 &&
                comment.map(
                  ({ _id, createdAt, user_id, vaccine_id, content }, index) => {
                    const isLast = index === comment.length - 1;
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
                            {user_id?.username}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {vaccine_id?.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {content}
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
                          {/* <Button
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
                                preConfirm: () => {},
                              });
                            }}
                            className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-blue-500 rounded-sm h-[50px] w-[50px] mr-2"
                          >
                            <span>
                              <PencilSquareIcon className="h-4 w-4" />
                            </span>
                            <span>Sửa</span>
                          </Button> */}
                          <Button className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-[50px] w-[50px]">
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
  );
};

export default CommentManagement;
