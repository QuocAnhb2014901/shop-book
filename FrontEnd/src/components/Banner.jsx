import React from 'react';

const Banner = () => {
  return (
    <div className="container-fluid p-0 mt-20">
      <div
        id="header-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="w-100"
              src="https://sachgiaokhoa.vn/pub/media/magiccart/magicslider/mobile/s/a/sach_on_thi_vao_10_quang_loi_web.jpg"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h5
                  className="text-white text-uppercase mb-3 animated slideInDown fw-bold"
                  style={{ color: "white", textShadow: "2px 2px 5px red" }}
                ></h5>
                <h1
                  className="display-1 text-dark mb-md-4 animated zoomIn fw-bold"
                  style={{ color: "white", textShadow: "2px 2px 5px red" }}
                ></h1>
                {/* <a
                  href="/RegisterVaccination"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Mua Ngay
                </a>
                <a
                  href=""
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight pd-10"
                >
                  Liên Hệ Ngay
                </a> */}
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="w-100"
              src="https://sachgiaokhoa.vn/pub/media/magiccart/magicslider/mobile/s/a/sach_on_thi_vao_10_quang_loi_web.jpg"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h5
                  className="text-white text-uppercase mb-3 animated slideInDown fw-bold"
                  style={{ color: "white", textShadow: "2px 2px 5px red" }}
                ></h5>
                <h1
                  className="display-1 text-white mb-md-4 animated zoomIn fw-bold"
                  style={{ color: "white", textShadow: "2px 2px 5px red" }}
                ></h1>
                {/* <a
                  href="/RegisterVaccination"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Mua Ngay
                </a>
                <a
                  href=""
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Liên Hệ Ngay
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        style={{ marginTop: "-100px", position: "absolute" }}
        className="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        style={{ marginTop: "-100px", position: "absolute" }}
        className="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
