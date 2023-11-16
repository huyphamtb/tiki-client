import { Button, Modal } from "antd";
import { useState } from "react";
import "./style.scss";

const UpdateItem = ({ icon, title, content, btnContent, component }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="update-item">
        <div className="update-item__icon">{icon}</div>
        <div className="update-item__content">
          <div className="title">{title}</div>
          {content && <div className="content">{content}</div>}
        </div>
        <Button onClick={showModal} type="ghost" htmlType="button" block>
          <span>{btnContent}</span>
        </Button>
      </div>
      <Modal
        title={title}
        visible={isModalVisible}
        // visible={true}
        okText="Lưu thay đổi"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {component}
      </Modal>
    </>
  );
};

export default UpdateItem;
