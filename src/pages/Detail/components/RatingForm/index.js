import { Alert, Button, Input, Modal, notification, Rate } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PRODUCT_API from "../../../../api/product";
import { STATUS_FAIL } from "../../../../constants/api";
import "./style.scss";

const { TextArea } = Input;
const RatingForm = ({ state, toggleModal, productId, onSuccess }) => {
  const { userInfo } = useSelector((state) => state.common);
  const [textValue, setTextValue] = useState("");
  const [starValue, setStarValue] = useState(5);
  const [isBought, setIsBought] = useState(false);

  const handleSubmit = async () => {
    if (isBought) {
      try {
        const payload = {
          user: userInfo._id,
          product_id: productId,
          content: textValue.trim(),
          stars: starValue,
        };

        const rateResponse = await PRODUCT_API.rate(payload);

        if (rateResponse.status === STATUS_FAIL)
          return notification.error({
            placement: "topRight",
            message: "Error!",
            description: rateResponse.message,
            duration: 3,
          });

        onSuccess(rateResponse.data);
        notification.success({
          placement: "topRight",
          message: "Successfully!",
          description: rateResponse.message,
          duration: 3,
        });

        toggleModal(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    else {
      return notification.warn({
        placement: "topRight",
        message: "Bạn chưa mua sản phẩm này",
        description: '',
        duration: 3,
      });

    }
  };

  const handleTextChange = ({ target: { value } }) => {
    setTextValue(value);
  };

  const handleStarChange = (stars) => {
    setStarValue(stars);
  };

  const ModalFooter = [
    <Button onClick={() => toggleModal(false)} danger>
      Hủy bỏ
    </Button>,
    <Button onClick={handleSubmit} type="primary">
      Gửi
    </Button>,
  ];

  useEffect(async () => {
    console.log('test render')
    if (userInfo._id === "") return;

    const response = await PRODUCT_API.getIsBought(userInfo._id, productId);
    if (response.data) setIsBought(true);
  }, []);
  return (
    <Modal
      onCancel={() => toggleModal(false)}
      title="Để lại đánh giá của bạn"
      visible={state}
      footer={ModalFooter}
    >
      <div className="rating__form">
        <div className="rating__form-container">
          {(isBought && (
            <div className="star__picker-wrapper">
              <Rate onChange={handleStarChange} defaultValue={5} />
            </div>
          )) || <Alert message="Mua sản phẩm để đánh giá chất lượng" />}
          <div className="comment__input-wrapper">
            <TextArea
              placeholder={
                isBought ? "Đánh giá của bạn" : "Để lại bình luận của bạn"
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RatingForm;
