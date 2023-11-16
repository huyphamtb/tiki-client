import { Link } from "react-router-dom";
import "./style.scss";

const TabItem = ({ tabItem: { img, name } }) => {
  return (
    <div id="tab_item">
      <Link to="#" className="tab_item__wrap">
        <div className="tab_item__img">
          <img src={img} alt={name} />
        </div>
        <div className="tab_item__name">{name}</div>
      </Link>
    </div>
  );
};

export default TabItem;
