import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./Hoadon.css"; // Import file CSS để style
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/post/Footer";

const MyOrder = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [myOrder, setMyOrder] = useState([]);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/otherVaccine?userId=${auth?._id}`)
      .then((res) => {
        setMyOrder(res.data.otherVaccine);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(myOrder);

  if (!auth) {
    navigate("/login");
    return null;
  }

  return (
    <div className="pt-36">
      <div className="date-selector container p-9">
        <label htmlFor="datePicker">Chọn ngày:</label>
        <input type="date" id="datePicker" value={selectedDate} />
      </div>

      {myOrder.length > 0 &&
        myOrder.map((order) => (
          <>
            <div className="invoice-container container-xxl mb-5 ">
              <div className="invoice-wrap">
                <div className="invoice-inner">
                  <table
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                    className="mb-4"
                  >
                    <tbody>
                      <tr>
                        <td align="right" valign="top">
                          <div className="business_info">
                            <table
                              border="0"
                              cellPadding="0"
                              cellSpacing="0"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <div
                                      className="mce-content-body"
                                      id="business_info_editor"
                                      style={{
                                        width: "255px",
                                        minHeight: "80px",
                                        position: "relative",
                                      }}
                                      spellCheck="false"
                                    >
                                      <p
                                        style={{ fontSize: "20pt" }}
                                        data-mce-style="font-size: 20pt;"
                                      >
                                        Poly Vaccine
                                      </p>
                                      <p className="text-lg">
                                        137 Nguyễn Thị Thập
                                        <br /> Hòa Minh, Liên Chiểu, Đà Nẵng
                                        <br /> <br /> 0123 456 789
                                        <br /> polyvacxin@fpt.edu.vn
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                        <td align="right" className="is_logo" valign="top">
                          <div id="logoDiv">
                            <img
                              className="logo"
                              id="logo"
                              src="https://polyvac.com.vn/wp-content/uploads/2023/04/logo.png"
                              style={{ width: "25%" }}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

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
                                    style={{ float: "left", fontSize: "14pt" }}
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
                                            <td style={{ paddingLeft: "20px" }}>
                                              <div
                                                className="mce-content-body"
                                                id="client_info"
                                                style={{
                                                  width: "200px",
                                                  minHeight: "80px",
                                                  position: "relative",
                                                }}
                                              >
                                                <p style={{ fontSize: "14pt" }}>
                                                  {order.username}
                                                  <br />
                                                  {order.address}
                                                  <br />
                                                  {order.phone_number}
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
                                    <span>{order?._id}</span>
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
                                      {order.createdAt}
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
                    <table className="table table-condensed table-bordered items-table">
                      <thead>
                        <tr>
                          <th>
                            <span>Tên Vắc-xin</span>
                          </th>
                          <th className="mount-header">
                            <span>Số Lượng</span>
                          </th>
                          <th className="mount-header">
                            <span>Đơn Giá</span>
                          </th>
                          <th className="subtotal-header">
                            <span>Thành Tiền</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody id="ItemsTable">
                        {order.cart.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span>{item.name}</span>
                            </td>
                            <td>
                              <span>{item.quantity}</span>
                            </td>
                            <td>
                              <span>{item.price}</span>
                            </td>
                            <td>
                              <span>{item.price * item.quantity}đ</span>
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
                              {order.cart.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                              )}
                              đ
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <Button
                    variant="primary"
                    className="print-btn bg-sky-700"
                    onClick={() => window.print()}
                  >
                    Bạn hãy chụp lại và xác nhận với nhân viên giao hàng
                    tiêm!!
                  </Button>
                </div>
              </div>
            </div>
          </>
        ))}

      <Footer></Footer>
    </div>
  );
};

export default MyOrder;
