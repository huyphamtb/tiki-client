import { Result } from "antd";
import { Link } from "react-router-dom";

const ResultPage = ({ status, title, subTitle }) => {
  return (
    <div id="result">
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={<Link to="/">Tiếp tục mua sắm</Link>}
      />
    </div>
  );
};

export default ResultPage;
