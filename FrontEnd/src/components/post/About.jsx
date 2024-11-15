const About = () => {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase"></h5>
              <h1 className="display-5 mb-0">Sách là một tri thức vô tận</h1>
            </div>
            <h4 className="text-body fst-italic mb-4">
              Với đội ngũ giáo viên tư vấn chuyên nghiệp, hết lòng vì học sinh.
            </h4>
            <p className="mb-4">
              Bạn có thể hoàn toàn yên tâm về sản phẩm của chúng tôi, tinh thần
              trách nhiệm đối với khách hàng luôn được đặt lên đầu tiên.
            </p>
            <div className="row g-3">
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3"></i>
                  Tận Tâm
                </h5>
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3"></i>
                  Sản phẩm chất lượng
                </h5>
              </div>
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3"></i>
                  Mở cửa 24/7
                </h5>
                <h5 className="mb-3">
                  <i className="fa fa-check-circle text-primary me-3"></i>
                  Giá cả phù hợp
                </h5>
              </div>
            </div>
            <a
              href="/RegisterVaccination"
              className="btn btn-primary py-3 px-5 mt-4 wow zoomIn"
              data-wow-delay="0.6s"
            >
              Mua Ngay
            </a>
          </div>
          <div className="col-lg-5" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded wow zoomIn"
                data-wow-delay="0.9s"
                src="https://rtholdings.edu.vn/wp-content/uploads/2023/12/z4905436138240_9bee445f85da1d17d4e06ab17a2e61f8-e1701400418554.jpg"
                style={{ objectFit: "cover" }}
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
