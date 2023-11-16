import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ORDER_API from '../../../../api/order';
import { STATUS_FAIL, STATUS_OK } from '../../../../constants/api';
import { CANCELED, CONFIRMED, DONE, PENDING } from '../../../../constants/bill';
import BillItem from '../BillItem';
import './style.scss';
const { confirm } = Modal;

const { TabPane } = Tabs;

const Bill = () => {
  const { userInfo } = useSelector((state) => state.common);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        if (!userInfo._id || userInfo._id === '') return;

        const response = await ORDER_API.queryUserOrdersList(userInfo._id);
        if (response.status === STATUS_FAIL)
          return console.log(response.message);

        setBills(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userInfo._id]);

  const pending = useMemo(
    () => bills.filter((item) => item.order_status === PENDING),
    [bills]
  );

  const confirmed = useMemo(
    () => bills.filter((item) => item.order_status === CONFIRMED),
    [bills]
  );

  const done = useMemo(
    () => bills.filter((item) => item.order_status === DONE),
    [bills]
  );

  const canceled = useMemo(
    () => bills.filter((item) => item.order_status === CANCELED),
    [bills]
  );

  const handleCancel = async (_id) => {
    confirm({
      title: 'Hủy Đơn Hàng',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      onOk: async () => {
        try {
          const response = await ORDER_API.canceledOrder(_id);
          if (response.status === STATUS_OK)
            try {
              const response = await ORDER_API.queryUserOrdersList(
                userInfo._id
              );
              if (response.status === STATUS_FAIL)
                return console.log(response.message);

              setBills(response.data);
            } catch (error) {
              console.log(error.message);
            }
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="bill">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả đơn" key="ALL">
          {bills.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Đang xử lý" key={PENDING}>
          {pending.map((item) => (
            <BillItem
              onCancel={() => handleCancel(item._id)}
              key={item._id}
              data={item}
            />
          ))}
        </TabPane>
        <TabPane tab="Đang giao hàng" key={CONFIRMED}>
          {confirmed.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Đã giao" key={DONE}>
          {done.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Đã hủy" key={CANCELED}>
          {canceled.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Bill;
