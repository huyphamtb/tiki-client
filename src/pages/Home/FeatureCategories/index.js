import { Category } from "../../../components";
import "./style.scss";
import COMMON_API from "../../../api/common";
import { useEffect, useState } from "react";
import { MySlick } from "../../../components";

const FeatureCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await COMMON_API.getCategories();
        console.log(response)

        setCategoriesList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div id="feature_categories__home">
      <div className="feature_categories__home__wrap">
        <div className="feature_categories__header">Danh Mục Nổi Bật</div>
        <div className="feature_categories__list">
          <MySlick dots={true} xl={10} md={10} lg={10} sm={10} xxl={10}>
            {categoriesList?.map((item) => {
              return (
                <div className="feature_categories__item" key={item._id}>
                  <Category data={item} />
                </div>
              );
            })}
          </MySlick>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategories;
