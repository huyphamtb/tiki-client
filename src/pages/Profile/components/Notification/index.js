import { CaretDownOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NOTIFICATION_API from '../../../../api/notification';
import ORDER_API from '../../../../api/order';
import { STATUS_FAIL, STATUS_OK } from '../../../../constants/api';
import BillItem from '../BillItem';
const { Panel } = Collapse;

const Notification = () => {
  const { userInfo } = useSelector((state) => state.common);
  const [notifications, setNotifications] = useState([]);

  useEffect(async () => {
    try {
      if (!userInfo._id || userInfo._id === '') return;

      const response = await NOTIFICATION_API.queryNotifications(userInfo._id);

      if (response.status === STATUS_FAIL) return console.log(response.message);

      const notificationsInfo = await Promise.all(
        response.data.map(
          (item) =>
            new Promise(async (resolve) => {
              let parsed;
              try {
                parsed = JSON.parse(item.content);
              } catch (error) {
                console.log(error);
              }

              if (parsed?.order_id) {
                const orderResponse = await ORDER_API.getOneOrder(
                  parsed.order_id
                );
                if (orderResponse.status === STATUS_OK)
                  parsed.orderDetail = orderResponse.data;
              }
              resolve({
                _id: item._id,
                text: parsed?.text || item.content,
                orderDetail: parsed?.orderDetail,
              });
            })
        )
      );

      setNotifications(notificationsInfo);
    } catch (error) {}
  }, [userInfo._id]);

  return (
    <div className="notification">
      <Collapse
        expandIcon={({ isActive }) => (
          <CaretDownOutlined rotate={isActive ? -90 : 0} />
        )}
      >
        {notifications
          .filter((item) => item.orderDetail)
          .map((item) => (
            <Panel header={item.text} key={item._id}>
              <BillItem data={item.orderDetail} />
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default Notification;
