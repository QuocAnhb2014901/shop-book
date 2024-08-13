import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistical } from "../../../redux/statisticalSlice";
import Chart from "chart.js/auto"; // Import Chart.js library

const Dashboard = () => {
  const dispatch = useDispatch();
  const chartContainer = useRef(null); // Reference to the chart container
  const { totalUsers, totalProducts, totalComments, totalOrders } = useSelector((state) => state.statistical.statistical);

  useEffect(() => {
    dispatch(fetchStatistical());
  }, [dispatch]);

  useEffect(() => {
    const chartData = {
      labels: [
        "Người dùng",
        "Sản phẩm",
        "Bình luận",
        "Đơn hàng",
      ],
      datasets: [
        {
          label: "Số lượng",
          data: [
            totalUsers,
            totalProducts,
            totalComments,
            totalOrders,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy the previous chart if it exists
    if (chartContainer.current) {
      if (chartContainer.current.chartInstance) {
        chartContainer.current.chartInstance.destroy();
      }

      // Render the new chart
      const newChartInstance = new Chart(chartContainer.current, {
        type: "bar",
        data: chartData,
        options: {
          // Add your chart options here if needed
        },
      });

      // Save the chart instance in the ref for future destruction
      chartContainer.current.chartInstance = newChartInstance;
    }
  }, [totalUsers, totalProducts, totalComments, totalOrders]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Thống Kê</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            {/* Your small boxes here */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Biểu đồ dạng cột</h3>
                </div>
                <div className="card-body">
                  <canvas ref={chartContainer}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
