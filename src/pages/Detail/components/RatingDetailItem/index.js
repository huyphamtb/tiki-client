import { CheckCircleOutlined } from '@ant-design/icons/lib/icons';
import { Avatar, Rate } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';
import './style.scss';

const RatingDetailItem = ({ data }) => {
  const { user } = data;
  const avtText = useMemo(() => {
    if (!user) return '';
    const { first_name, last_name } = user;
    return `${last_name[0]}${first_name[0]}`;
  }, [user]);

  return (
    <div className="rating__detail-item">
      <div className="item-container">
        <div className="user-container">
          <div className="user__info">
            <Avatar size="large">{avtText}</Avatar>
            <div className="user-detail__info">
              <span className="user-full__name">{`${user?.last_name} ${user?.first_name}`}</span>
              <span className="user-timestamp">{`Đã tham gia vào ${moment(
                user?.createdAt
              ).format('DD-mm-yyyy')}`}</span>
              {data.stars && (
                <div className="tick">
                  <CheckCircleOutlined style={{ color: 'var(--my-green)' }} />
                  <span>{' Đã mua hàng'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="detail">
          {data.stars && (
            <div className="detail-stars__amount">
              <Rate
                disabled
                defaultValue={data.stars}
                style={{ transform: 'translateY(-4px)' }}
              />
            </div>
          )}
          <div className="detail-content">{data.content}</div>
        </div>
      </div>
    </div>
  );
};

export default RatingDetailItem;
