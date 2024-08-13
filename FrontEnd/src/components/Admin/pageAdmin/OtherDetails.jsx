import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOtherById } from "../../../redux/otherSlice";
import { useParams } from "react-router-dom";

const OtherDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOtherById(id));
  }, [dispatch, id]);
  const { other } = useSelector((state) => state.other || []);
  console.log(other);

  // let totalPrice = 0;
  // other?.cart?.forEach((item) => {
  //   totalPrice += item.price * item.quantity;
  // });

  return (
    <div className="content-wrapper">
      <div className="content-header p-4">
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto">
          {other?.cart?.map((item) => (
            <div key={item._id}>
              {/* <div key={item._id} className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-lg font-semibold">
                  Giá:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}{" "}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  Số lượng: {item.quantity}
                </p>
              </div>
            </div> */}
              <div className="invoice-container container-xxl mb-5 ">
                <div className="invoice-wrap">
                  <div className="invoice-inner">
                    <div
                      className="invoice-address pt-8"
                      style={{ borderTop: "3px double #000000" }}
                    >
                      <table
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td align="right" colSpan="2" valign="top">
                              <div
                                className="mce-content-body"
                                style={{
                                  textAlign: "center",
                                }}
                                spellCheck="false"
                              >
                                <p>
                                  <span
                                    style={{ fontSize: "20pt" }}
                                    data-mce-style="font-size: 20pt;"
                                  >
                                    Hóa Đơn
                                  </span>
                                </p>
                              </div>
                              <br />
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top" width="60%">
                              <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        float: "left",
                                        fontSize: "14pt",
                                      }}
                                      valign="top"
                                    >
                                      <strong>
                                        <span style={{ fontWeight: "bold" }}>
                                          Hóa đơn tới:
                                        </span>
                                      </strong>
                                    </td>
                                    <td valign="top">
                                      <div className="client_info">
                                        <table
                                          border="0"
                                          cellPadding="0"
                                          cellSpacing="0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{ paddingLeft: "20px" }}
                                              >
                                                <div
                                                  className="mce-content-body"
                                                  id="client_info"
                                                  style={{
                                                    width: "200px",
                                                    minHeight: "80px",
                                                    position: "relative",
                                                  }}
                                                >
                                                  <p
                                                    style={{ fontSize: "14pt" }}
                                                  >
                                                    {other.username}
                                                    <br />
                                                    {other.address}
                                                    <br />
                                                    {other.phone_number}
                                                  </p>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td align="right" valign="top" width="40%">
                              <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody style={{ fontSize: "14pt" }}>
                                  <tr>
                                    <td align="right">
                                      <strong>
                                        <span
                                          style={{
                                            textAlign: "right",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Hóa đơn số:
                                        </span>
                                      </strong>
                                    </td>
                                    <td
                                      align="left"
                                      id="no"
                                      style={{ paddingLeft: "20px" }}
                                    >
                                      <span>{other?._id}</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="right">
                                      <strong>
                                        <span
                                          style={{
                                            textAlign: "right",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Ngày:
                                        </span>
                                      </strong>
                                    </td>
                                    <td
                                      align="right"
                                      style={{ paddingLeft: "20px" }}
                                    >
                                      <span
                                        id="date"
                                        style={{ textAlign: "right" }}
                                      >
                                        {other.createdAt}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div id="items-list">
                      <table className="table table-condensed table-bordered  items-table">
                        <thead>
                          <tr>
                            <th>
                              <span>Tên Sản Phẩm</span>
                            </th>
                            <th className="mount-header">
                              <span>Số Lượng</span>
                            </th>
                            <th className="mount-header">
                              <span>Đơn Giá</span>
                            </th>
                            <th className="mount-header">
                              <span>size</span>
                            </th>
                            <th className="subtotal-header">
                              <span>Thành Tiền</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody id="ItemsTable">
                          {other.cart.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <span>{item.name}</span>
                              </td>
                              <td>
                                <span>{item.quantity}</span>
                              </td>
                              <td>
                                <span>{item.price} đ</span>
                              </td>
                              <td>
                                <span>{item.size}</span>
                              </td>
                              <td>
                                <span>{item.price * item.quantity} đ</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                        <tfoot id="TotalsSection">
                          <tr className="totals-row" id="TotalRow">
                            <td className="wide-cell" colSpan="2"></td>
                            <td>
                              <strong>
                                <span>Tổng Tiền</span>
                              </strong>
                            </td>
                            <td colSpan="2">
                              <span>
                                {other.cart.reduce(
                                  (acc, item) =>
                                    acc + item.price * item.quantity,
                                  0
                                )} đ
                              </span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
