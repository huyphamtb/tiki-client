import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PRODUCT_API from "../../api/product";
import LoadingSection from "../../components/LoadingSection";
import ProductsList from "../../components/ProductsList";
import { STATUS_FAIL, STATUS_OK } from "../../constants/api";
import DetailInfo from "./components/DetailInfo";
import MainInfo from "./components/MainInfo";
import "./style.scss";

const DetailProductPage = () => {
  const { userInfo } = useSelector((state) => state.common);
  const [productInfo, setProductInfo] = useState(null);
  const [relavantProducts, setRelavantProducts] = useState([]);
  const { slug } = useParams();
  const [ratesList, setRatesList] = useState([]);

  useEffect(() => {
    PRODUCT_API.getOneProduct(slug)
      .then(async (response) => {
        if (response.status === STATUS_OK) {
          setProductInfo(response.data);
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  useEffect(() => {
    (async function () {
      try {
        if (!productInfo?._id) return;

        const ratesResponse = await PRODUCT_API.queryRates(
          `?product_id=${productInfo._id}`
        );


        if (ratesResponse.status === STATUS_FAIL)
          return console.log(ratesResponse.message);

        setRatesList(ratesResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [productInfo]);

  useEffect(() => {
    (async function () {
      if (!productInfo) return;

      try {
        const relateResponse = await PRODUCT_API.queryProducts(
          `?categories=${productInfo.categories[0]._id}`
        );

        if (relateResponse.status === STATUS_FAIL)
          return console.log(relateResponse.message);

        setRelavantProducts(relateResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [productInfo]);
  const avgStar = useMemo(() => {
    if (!ratesList.length) return 0;

    const hasStarsList = ratesList.filter((item) => item.stars);
    const totalStars = hasStarsList.reduce((prev, cur) => {
      return cur.stars + prev;
    }, 0);

    return totalStars > 0
      ? Number(totalStars / hasStarsList.length).toFixed(1)
      : 0;
  }, [ratesList]);
  const handleRateSuccess = (newItem) => {
    setRatesList((prev) => [{ ...newItem, user: userInfo }, ...prev]);
  };

  return (
    <div id="detail__product">
      {!productInfo ? (
        <LoadingSection />
      ) : (
        <div className="container">
          <div className="detail__product-container">
            <div className="bread__crumb-container">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/products">Products</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{productInfo.name}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="main__info-wrapper">
              <MainInfo avgStar={avgStar} data={productInfo} />
            </div>
            <div className="relavant__products-wrapper">
              <ProductsList
                title="Sản phẩm liên quan"
                data={relavantProducts}
              />
            </div>
            <div className="detail__info-wrapper">
              <DetailInfo
                ratesList={ratesList}
                avgStar={avgStar}
                data={productInfo}
                onRateSuccess={handleRateSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProductPage;
