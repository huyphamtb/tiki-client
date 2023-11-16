import { formatNumber, getSalePrice } from "../../../../utils";
import "./style.scss";

const OrderItem = ({ data }) => {
  return (
    <div className="order__item">
      <div className="order__item-wrapper">
        <div className="thumbnail">
          <img src={data.product?.thumbnail_url} alt={data.product?.name} />
        </div>
        <div className="info-wrapper">
          <h4 className="info-name">{data.product?.name}</h4>
          <div className="info-detail__container">
            <span className="info-quantity">SL: x{data.quantity}</span>
            <span className="amount">
              Đơn giá:
              {" " +
                formatNumber(
                  getSalePrice(data.product?.price, data.product?.sale_percent)
                )}
              đ
            </span>
          </div>
        </div>
        <div className="total">
          <span>
            {formatNumber(
              getSalePrice(data.product?.price, data.product?.sale_percent) *
                data.quantity
            )}
            đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
