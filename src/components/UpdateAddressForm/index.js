import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADDRESS_API from '../../api/address';
import { STATUS_OK } from '../../constants/api';
import { commonActions } from '../../store/common';
import CreateAddressForm from './CreateAddressForm';
import EditAddressForm from './EditAddressForm';
import './style.scss';

const { confirm } = Modal;

const UpdateAddressForm = ({ onSelectAddress }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.common);
  const [createAddressModalVisibled, setCreateAddressModalVisibled] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const handleOpenCreateModal = () => {
    setCreateAddressModalVisibled(true);
  };

  const handleOpenEditModal = (data) => {
    setSelectedAddress(data);
  };

  const closeCreateModal = () => {
    setCreateAddressModalVisibled(false);
  };

  const closeEditModal = () => {
    setSelectedAddress(null);
  };

  const handleDeleteAddress = (_id) => {
    ADDRESS_API.removeAddress(_id)
      .then((response) => {
        if (response.status === STATUS_OK) {
          const newAddrs = addresses.filter((item) => item._id !== _id);
          dispatch(commonActions.setAddresses(newAddrs));
        } else throw new Error(response.message);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectAddress = (data) => {
    onSelectAddress && onSelectAddress(data);
  };

  const confirmDelete = (_id) => {
    confirm({
      title: 'Xóa Địa Chỉ',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn thực sự muốn xóa địa chỉ này?',
      onOk() {
        handleDeleteAddress(_id);
      },
    });
  };

  return (
    <>
      <div className="address__modal-wrapper">
        <div className="address__modal-top__action">
          <Button
            type="text"
            onClick={handleOpenCreateModal}
            style={{ marginBottom: 20, marginLeft: 'auto', marginTop: -16 }}
          >
            <strong>
              <PlusOutlined style={{ marginRight: 4 }} />
              Thêm địa chỉ
            </strong>
          </Button>
        </div>
        <ul className="address__model-address__list">
          {addresses?.length > 0 &&
            addresses.map((item) => {
              return (
                <li
                  onClick={() => handleSelectAddress(item)}
                  className="address__list-address__item"
                >
                  <EnvironmentOutlined
                    style={{
                      transform: 'translateY(5px)',
                      color: 'rgb(224, 86, 86)',
                    }}
                  />
                  <p className="address__item-text">
                    {`${item.street}, P.${item.ward.name}, Q.${item.district.name}, 
                  ${item.province.name}`}
                  </p>
                  <div className="address__item-actions">
                    {/* <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleOpenEditModal(item)}
                    /> */}
                    <Button
                      type="text"
                      onClick={() => confirmDelete(item._id)}
                      icon={<DeleteOutlined />}
                      style={{
                        color: 'rgb(224, 86, 86)',
                      }}
                    />
                  </div>
                </li>
              );
            })}
        </ul>

        <Modal
          title={<strong>Thêm địa chỉ nhận hàng</strong>}
          visible={createAddressModalVisibled}
          okText="Lưu thay đổi"
          onOk={closeCreateModal}
          onCancel={closeCreateModal}
          footer={null}
          width={600}
          destroyOnClose
        >
          <CreateAddressForm onCreateSuccess={closeCreateModal} />
        </Modal>
        <Modal
          title={'Cập nhật địa chỉ'}
          visible={!!selectedAddress}
          okText="Lưu thay đổi"
          onOk={closeEditModal}
          onCancel={closeEditModal}
          footer={null}
          width={600}
          destroyOnClose
        >
          <EditAddressForm
            data={selectedAddress}
            onUpdateSuccess={closeEditModal}
          />
        </Modal>
      </div>
    </>
  );
};

export default UpdateAddressForm;
