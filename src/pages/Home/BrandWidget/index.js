import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import COMMON_API from "../../../api/common";
import { Brand, MySlick } from "../../../components";
import "./style.scss";

const BrandWidget = () => {
  const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await COMMON_API.getBrands();

        setBrandsList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div id="brand_widget__home">
      <div className="brand_widget__home__wrap">
        <div className="brand_widget__header">
          <div className="title">
            <div className="title_img">
              <img
                src="https://salt.tikicdn.com/ts/upload/33/0f/67/de89fab36546a63a8f3a8b7d038bff81.png"
                alt="brand"
              />
            </div>
            <div className="title_text">Thương Hiệu Chính Hãng</div>
          </div>
          <div className="see_more">
            <Link to="/products">XEM THÊM</Link>
          </div>
        </div>
        <div className="brand_widget__cards">
          <MySlick dots={true} xl={6} md={6} lg={6} sm={6} xxl={6}>
            {brandsList?.map((item) => {
              return (
                <div className="brand_widget__item" key={item.id}>
                  <Brand data={item} />
                </div>
              );
            })}
          </MySlick>
        </div>
      </div>
    </div>
  );
};

export default BrandWidget;
