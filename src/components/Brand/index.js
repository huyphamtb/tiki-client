import "./style.scss";
import { Link } from "react-router-dom";

const Brand = ({ data }) => {
  return (
    <div id="brand_component">
      <Link
        to={`/products?brand=${data._id}`}
        className="brand_component__wrap"
      >
        <div className="brand_component__header">
          <div className="thumbnail">
            <img src={data.image_url} alt="brand" />
          </div>
          {/* <p className="title">{data.name}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Brand;
