import { Button } from 'antd';
import { useMemo } from 'react';
import { CANCELED, DONE, PENDING } from '../../../../constants/bill';
import { formatNumber } from '../../../../utils';
import OrderItem from '../OrderItem';
import './style.scss';

const BillItem = ({ data, onCancel }) => {
  const { order_items, _id } = data;
  const totalAmount = useMemo(() => {
    const total = order_items?.reduce((prev, cur) => {
      return prev + cur.quantity * cur.item_price;
    }, 0);

    return total;
  }, [data]);

  return (
    <div className="bill-item">
      <div className="bill-item__status">
        <span>
          {data.order_status === DONE
            ? 'Đã giao'
            : data.order_status === PENDING
            ? 'Đang xử lý'
            : data.order_status === CANCELED
            ? 'Đã hủy'
            : 'Đang giao hàng'}
        </span>
        {data.order_status === PENDING && (
          <div className="bill-item__canceled">
            <Button type="primary" danger ghost onClick={onCancel}>
              Hủy đơn
            </Button>
          </div>
        )}
      </div>
      <div className="bill-item__order-list">
        {data.order_items?.map((item) => (
          <OrderItem key={item._id} data={item} />
        ))}
      </div>
      <div className="bill-item__footer">
        <div className="footer__total-price">
          Tổng tiền:{' '}
          <span className="total-price">{formatNumber(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillItem;
