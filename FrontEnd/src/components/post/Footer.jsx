import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 mt-3">
      <div className="container mx-auto flex flex-wrap justify-between mb-10">
        <div className="w-full md:w-2/5">
          <h2 className="text-2xl font-bold mb-4">Liên Hệ</h2>
          <p>Địa chỉ: 137 Nguyễn Thị Thập,p Hòa Minh,q Liên Chiểu, Thành phố Đà Nẵng</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Email: polyvacxin@fpt.edu.vn</p>
        </div>
        <div className="w-full md:w-1/5">
          <h2 className="text-2xl font-bold mb-4">Về Chúng Tôi</h2>
          <ul className="space-y-2">
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/mission">Sứ mệnh</a></li>
            <li><a href="/team">Đội ngũ</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h2 className="text-2xl font-bold mb-4">Hỗ Trợ</h2>
          <ul className="space-y-2">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/terms">Điều khoản sử dụng</a></li>
            <li><a href="/privacy">Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/5">
          <h2 className="text-2xl font-bold mb-4">Kết Nối Với Chúng Tôi</h2>
          <ul className="space-y-2">
            <li><a href="/facebook">Facebook</a></li>
            <li><a href="/twitter">Twitter</a></li>
            <li><a href="/instagram">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="container-fluid text-light py-4" style={{background: '#051225'}}>
        <div className="container">
            <div className="row g-0">
                <div className="col-md-6 text-center text-md-start">
                    <p className="mb-md-0">&copy; <a className="text-white border-bottom" href="#">polyvacxin@fpt.edu.vn</a>. Bảo lưu mọi quyền.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                    <p className="mb-0">Thiết Kế Bởi <a className="text-white border-bottom" href="#">Polyvacxin</a><br/>              
                    </p>
                </div>
            </div>
        </div>
    </div>
    <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded back-to-top"><i className="bi bi-arrow-up"></i></a>
    </footer>
  );
};

export default Footer;