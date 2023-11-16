import "./style.scss";
import { Link } from "react-router-dom";

const Event = ({ event: { thumbnail, title } }) => {
  return (
    <div id="event_component">
      <Link to="#" className="event_component__wrap">
        <div className="event_component__header">
          <div className="thumbnail">
            <img src={thumbnail} alt="event" />
          </div>
          <p className="title">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default Event;
