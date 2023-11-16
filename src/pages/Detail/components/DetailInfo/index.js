import { Alert, Button, Col, Progress, Rate, Row, Tooltip } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAuthorization from '../../../../hooks/useAuthorization';
import { commonActions } from '../../../../store/common';
import RatingDetailItem from '../RatingDetailItem';
import RatingForm from '../RatingForm';
import './style.scss';

const DetailInfo = ({ data, ratesList, avgStar, onRateSuccess }) => {
  const descRef = useRef();
  const [descHeight, setDescHeight] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [rateModalVisibled, setRateModalVisibled] = useState(false);
  const { checkRole } = useAuthorization();
  const dispatch = useDispatch();

  const toggleModal = (state) => {
    if (!checkRole()) return dispatch(commonActions.toggleLoginForm(true));
    setRateModalVisibled(state);
  };

  const starsStatistic = useMemo(() => {
    const star1 = ratesList.filter((item) => item.stars === 1).length;
    const star2 = ratesList.filter((item) => item.stars === 2).length;
    const star3 = ratesList.filter((item) => item.stars === 3).length;
    const star4 = ratesList.filter((item) => item.stars === 4).length;
    const star5 = ratesList.filter((item) => item.stars === 5).length;

    return [
      (star1 / ratesList.length) * 100,
      (star2 / ratesList.length) * 100,
      (star3 / ratesList.length) * 100,
      (star4 / ratesList.length) * 100,
      (star5 / ratesList.length) * 100,
    ];
  }, [ratesList]);

  useEffect(() => {
    if (descRef.current.clientHeight)
      setDescHeight(descRef.current.clientHeight);
  }, [descRef, data.description]);

  useEffect(() => {
    if (descHeight > 1500) setIsExpanded(false);
  }, [descHeight]);

  return (
    <div className="product__detail-detail__info">
      <RatingForm
        productId={data._id}
        state={rateModalVisibled}
        toggleModal={toggleModal}
        onSuccess={onRateSuccess}
      />
      <div className="detail__info-container">
        <div className="info-description">
          <h3 className="title">Thông tin chi tiết</h3>
          <div
            ref={descRef}
            className={
              'description-block' + (isExpanded ? ' expand' : ' not__expand')
            }
          >
            <div className="expand__btn">
              <Button onClick={() => setIsExpanded(!isExpanded)} type="primary">
                {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            </div>
            <div
              className="description-wrapper"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
        <div className="info-rating">
          <h3 className="title">{`Đánh giá sản phẩm (${ratesList.length})`}</h3>
          <div className="rating-wrapper">
            <Row align="middle">
              <Col span={8}>
                <div className="rating-overrall">
                  <span className="amount">{`${avgStar} / 5 Sao`}</span>
                  <div className="stars__amount">
                    <Rate
                      disabled
                      style={{ fontSize: 32 }}
                      allowHalf
                      value={avgStar}
                    />
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <div className="rating-statistic">
                  {starsStatistic.map((item, index) => (
                    <div className="rating-statistic-item__wrapper">
                      <Rate
                        style={{
                          flexShrink: 0,
                          marginRight: 16,
                          transform: 'translateY(-2px)',
                        }}
                        value={index + 1}
                        disabled
                      />
                      <Progress
                        format={(percent) => `${percent}%`}
                        percent={Math.floor(item)}
                      />
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
          <div className="rate__action">
            <Tooltip title="Viết đánh giá của bạn">
              <Button
                style={{
                  backgroundColor: 'var(--my-primary-color)',
                  border: 'none',
                  color: 'white',
                }}
                onClick={() => toggleModal(true)}
              >
                Tạo đánh giá hoặc bình luận
              </Button>
            </Tooltip>
          </div>
          <div className="rating__detail">
            {!ratesList?.length && (
              <Alert message="Sản phẩm chưa có đánh giá nào" type="info" />
            )}
            {ratesList?.length > 0 && (
              <ul className="rating__detail-list">
                {ratesList.map((item) => (
                  <li key={item._id} className="rating__detail-item__wrapper">
                    <RatingDetailItem data={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
