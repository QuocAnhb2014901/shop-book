const About = () => {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                
              </h5>
              <h1 className="display-5 mb-0">
                Shop bán quần áo thể thao mà bạn có thể yên tâm tin tưởng
              </h1>
            </div>
            <h4 className="text-body fst-italic mb-4">
              Với đội ngũ tư vấn chuyên nghiệp, hết lòng vì khách hàng.
            </h4>
            <p className="mb-4">
              Bạn có thể hoàn toàn yên tâm về chúng tôi, tinh thần trách nhiệm đối với khách hàng luôn được đặt lên đầu tiên.
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
              Đăng ký Ngay
            </a>
          </div>
          <div className="col-lg-5" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded wow zoomIn"
                data-wow-delay="0.9s"
                src="/template/dentcare-1.0.0/img/about.jpg"
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
