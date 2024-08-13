import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { getVaccine } from "../redux/vaccineSlice";
import { addPatient } from "../redux/patientSlice";
import Footer from "../components/post/Footer";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../redux/categorySlice";
import aixos from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên."),
  birthday: yup.string().required("Vui lòng nhập ngày sinh."),
  gender: yup.string().required("Vui lòng chọn giới tính."),
  address: yup.string().required("Vui lòng nhập địa chỉ."),
  guardian: yup.string().required("Vui lòng nhập tên người thân."),
  relationship_guardian: yup.string().required("Vui lòng chọn mối quan hệ."),
  phone_number: yup.string().required("Vui lòng nhập số điện thoại."),
  target_date: yup.string().required("Vui lòng chọn mong muốn."),
});

const RegisterVaccination = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegisterVaccination = async (data) => {
    dispatch(addPatient(data));
  };
  const category = useSelector((state) => state.category.category);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const data = await response.json();
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocations();
  }, []);
  const [vaccines, setVaccines] = useState([]);

  const handleOnChangeCategory = async (e) => {
    const res = await aixos.get(
      `http://localhost:3000/api/v1/getVaccine?category=${e.target.value}`
    );
    setVaccines(res.data.vaccine);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  if (!auth) {
    navigate("/login");
    return null;
  }
  return (
    <div>
      <div className="container pt-32">
        <div className="row">
          <div className="col-8">
            <form
              className="ui form"
              onSubmit={handleSubmit(handleRegisterVaccination)}
            >
              <h5 className="">THÔNG TIN NGƯỜI TIÊM</h5>
              <div className="two fields">
                <div className="field">
                  <label>Mã số thuế(Nếu có)</label>
                  <input
                    type="text"
                    placeholder="Mã số thuế"
                    {...register("code_number")}
                  />
                </div>
                <div className="field">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    {...register("name")}
                  />
                  <p className="text-red-500 mt-1">{errors.name?.message}</p>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Giới tính</label>
                  <select className="ui fluid dropdown" {...register("gender")}>
                    <option value="">Chọn giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nu">Nữ</option>
                  </select>
                  <p className="text-red-500 mt-1">{errors.gender?.message}</p>
                </div>
                <div className="field">
                  <label>Ngày Sinh</label>
                  <input
                    type="date"
                    placeholder="Date"
                    {...register("birthday")}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.birthday?.message}
                  </p>
                </div>
              </div>
              <div className="three fields">
                <div className="field">
                  <label>Tỉnh - Thành phố</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("province")}
                  >
                    <option value="">Chọn tỉnh - thành phố</option>
                    {locations.length > 0 &&
                      locations.map((province) => (
                        <option key={province.code} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="field">
                  <label>Quận - Huyện</label>
                  <select className="ui fluid dropdown">
                    <option value="">Chọn quận huyện</option>
                    <option value="ninhkieu">Ninh Kieu</option>
                    <option value="cairang">Cai Rang</option>
                  </select>
                </div>
                <div className="field">
                  <label>Phường - Xã</label>
                  <select className="ui fluid dropdown">
                    <option value="">Chọn phường xã</option>
                    <option value="anhoa">An Hoa</option>
                    <option value="test">test</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Địa chỉ cụ thể</label>
                <input
                  type="text"
                  placeholder="Địa chỉ cụ thể"
                  {...register("address")}
                  defaultValue={auth.address}
                />
                <p className="text-red-500 mt-1">{errors.address?.message}</p>
              </div>

              <h5 className="">THÔNG TIN LIÊN HỆ</h5>
              <div className="field">
                <label>Họ và tên người người thân</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  {...register("guardian")}
                  defaultValue={auth.username}
                />
                <p className="text-red-500 mt-1">{errors.guardian?.message}</p>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Mối quan hệ với người tiêm</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("relationship_guardian")}
                  >
                    <option value="">Chọn mối quan hệ</option>
                    <option value="cha">Cha</option>
                    <option value="me">Me</option>
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.relationship_guardian?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    {...register("phone_number")}
                    defaultValue={auth.phone}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.phone_number?.message}
                  </p>
                </div>
              </div>
              <h5 className="">THÔNG TIN DỊCH VỤ</h5>
              <div className="two fields">
                <div className="field">
                  <label>Category</label>
                  <select
                    className="ui fluid dropdown"
                    onChange={handleOnChangeCategory}
                  >
                    {category.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.vaccine_id?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Tên Vắc Xin</label>
                  <select
                    className="ui fluid dropdown"
                    {...register("vaccine_id")}
                  >
                    {vaccines.map((vaccine) => {
                      return (
                        <option key={vaccine.id} value={vaccine._id}>
                          {vaccine.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500 mt-1">
                    {errors.vaccine_id?.message}
                  </p>
                </div>
                <div className="field">
                  <label>Ngày tiêm</label>
                  <input
                    type="date"
                    placeholder="date"
                    {...register("target_date")}
                  />
                  <p className="text-red-500 mt-1">
                    {errors.target_date?.message}
                  </p>
                </div>
                <input
                  {...register("registrationForm")}
                  type="hidden"
                  value="online"
                />
              </div>
              <div className="ui buttons">
                <button className="ui button">Nhập lại</button>
                <div className="or"></div>
                <button type="submit" className="ui primary button">
                  Đăng ký
                </button>
              </div>
            </form>
            <br />
          </div>
          <div className="col-4">
            <h5 className="">CÂU HỎI THƯỜNG GẶP</h5>
            <div className="ui items">
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/img/video.jpg" />
                </a>
                <div className="content">
                  <a className="header">Stevie Feliciano</a>
                  <div className="description">
                    <p>
                      Stevie Feliciano is a <a>library scientist</a> living in
                      New York City. She likes to spend her time reading,
                      running, and writing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/img/video.jpg" />
                </a>
                <div className="content">
                  <a className="header">Veronika Ossi</a>
                  <div className="description">
                    <p>
                      Veronika Ossi is a set designer living in New York who{" "}
                      <a>enjoys</a> kittens, music, and partying.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui tiny image">
                  <img src="https://vnvc.vn/img/video.jpg" />
                </a>
                <div className="content">
                  <a className="header">Jenny Hess</a>
                  <div className="description">
                    <p>
                      Jenny is a student studying Media Management at{" "}
                      <a>the New School</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default RegisterVaccination;
