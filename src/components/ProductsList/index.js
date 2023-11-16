import Product from "../Product";
import MySlick from "../Slick";
import "./style.scss";

const ProductsList = ({ data, className, title }) => {
  return (
    <div className={`global__products__list ${className || ""}`}>
      <h2 className="products__list-title">{title}</h2>
      <div className="list-container">
        <MySlick arrows={true} dots={true} xxl={5} xl={5} lg={5} md={4}>
          {data.map((item) => (
            <div className="products__list-item__wrapper">
              <Product data={item} />
            </div>
          ))}
        </MySlick>
      </div>
    </div>
  );
};

export default ProductsList;
