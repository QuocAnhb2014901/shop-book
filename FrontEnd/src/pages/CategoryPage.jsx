import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { id } = useParams();
  const [vaccineList, setVaccineList] = React.useState([]);

  const getVaccineList = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/getVaccine?category=${id}`
    );
    setVaccineList(res.data.vaccine);
  };

  React.useEffect(() => {
    getVaccineList();
  }, [id]);

  console.log(vaccineList);

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 pt-44">
        {vaccineList.length > 0 &&
          vaccineList?.map((item) => {
            return (
              <div key={item._id}>
                <Link to={`/vacxindetail/${item._id}`}>
                  <div
                    className="max-w-sm mb-5 wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700"
                    data-wow-delay="0.9s"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-sm shadow-md border border-gray-200"
                    />

                    <div className="p-4 text-lg font-normal text-center">
                      {item.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryPage;
