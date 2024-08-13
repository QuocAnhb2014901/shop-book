import { useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../../../redux/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./loading.css";
import Sidebar from "../../Nav/Sidebar";

const schema = yup.object().shape({
  code_number: yup.string().required("Vui lòng nhập mã số"),
  name: yup.string().required("Vui lòng nhập tên"),
});

const UpdateInformation = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientById(id));
  }, [dispatch, id]);

  const patient = useSelector((state) => state.patient.patient);
  const isLoading = useSelector((state) => state.patient.isLoading);


  const handleUpdatePatient = async (data) => {
    console.log(data);
    try {
      const res = await dispatch(updatePatient({ id, data })); 
      if (updatePatient.rejected.match(res)) {
        
        console.log(res.error.message);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Update thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <Sidebar />
    <div className="container flex justify-center mt-32">
    <div className="h-max w-full max-w-[60rem] py-5 px-32 shadow shadow-blue-gray-900/5">
        <h1 className="font-bold text-2xl text-center mb-9">
          Update Danh Sách Tiêm
        </h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleUpdatePatient)}
          className="w-full max-w-[60rem]  "
        >
          <div className=" mb-4">
            <span>Mã số: </span>
            <input
              type="text"
              placeholder="Enter your content"
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 ml-[80px] outline-none  bg-transparent"
              {...register("code_number")}
              defaultValue={patient.code_number}
            />
            <p className="text-red-500 mt-1">{errors.code_number?.message}</p>
          </div>
          <div className=" mb-4">
            <span>Họ và tên: </span>
            <input
              type="text"
              placeholder="Enter your content"
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 ml-[59px] outline-none  bg-transparent"
              {...register("name")}
              defaultValue={patient.name}
            />
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          </div>
          <div className=" mb-4">
            <span>Ho: </span>
            <input
              {...register("cough")}
              type="radio"
              className=" ml-28 mr-2"
              value={1}
            />
            <span>Có</span>
            <input
              {...register("cough")}
              type="radio"
              className=" ml-11 mr-2"
              value={0}
            />
            <span>Không</span>
          </div>
          <div className=" mb-4">
            <span>Nóng Lạnh: </span>
            <input
              {...register("fever")}
              type="radio"
              className=" ml-14 mr-2"
              value={1}
            />
            <span>Có</span>
            <input
              {...register("fever")}
              type="radio"
              className=" ml-11 mr-2"
              value={0}
            />
            <span>Không</span>
          </div>
          <div className=" mb-4">
            <span>Ói Mửa: </span>
            <input
              {...register("spew")}
              type="radio"
              className=" ml-[72px] mr-2"
              value={1}
            />
            <span>Có</span>
            <input
              {...register("spew")}
              type="radio"
              className=" ml-11 mr-2"
              value={0}
            />
            <span>Không</span>
          </div>
          <div className=" mb-4">
            <span>Khó Thở: </span>
            <input
              {...register("breath_heavily")}
              type="radio"
              className=" ml-[64px] mr-2"
              value={1}
            />
            <span>Có</span>
            <input
              {...register("breath_heavily")}
              type="radio"
              className=" ml-11 mr-2"
              value={0}
            />
            <span>Không</span>
          </div>
          <div className=" mb-4">
            <span>Co Giật: </span>
            <input
              {...register("convulsions")}
              type="radio"
              className=" ml-[73px] mr-2"
              value={1}
            />
            <span>Có</span>
            <input
              {...register("convulsions")}
              type="radio"
              className=" ml-11 mr-2"
              value={0}
            />
            <span>Không</span>
          </div>
          <button className=" h-10 w-20 rounded-sm bg-slate-200" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateInformation;
