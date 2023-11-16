import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADDRESS_API from '../../../api/address';
import { STATUS_OK } from '../../../constants/api';
import transportService from '../../../services/transport';
import { commonActions } from '../../../store/common';
import './style.scss';
const { Option } = Select;

const CreateAddressForm = ({ onCreateSuccess }) => {
  const [form] = Form.useForm();
  const { userInfo, addresses } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const [provinces, setProvinces] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [districts, setDistricts] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [wards, setWards] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [street, setStreet] = useState();

  const handleProvinceSelect = (value) => {
    setSelectedProvince(value);
  };

  const handleDistrictSelect = (value) => {
    setSelectedDistrict(value);
  };

  const handleWardSelect = (value) => {
    setSelectedWard(value);
  };

  const handleStreetChange = ({ target: { value } }) => {
    setStreet(value);
  };

  const handleSubmit = () => {
    const province = provinces.find(
      (item) => item.ProvinceID === selectedProvince
    );
    const district = districts.find(
      (item) => item.DistrictID === selectedDistrict
    );
    const ward = wards.find((item) => item.WardCode === selectedWard);
    const payload = {
      user: userInfo._id,
      province: {
        name: province?.ProvinceName,
        code: selectedProvince,
      },
      district: {
        name: district.DistrictName,
        code: selectedDistrict,
      },
      ward: {
        name: ward?.WardName,
        code: selectedWard,
      },
      street,
    };

    ADDRESS_API.createAddress(payload)
      .then((response) => {
        if (response.status === STATUS_OK) {
          dispatch(commonActions.setAddresses([...addresses, response.data]));
          onCreateSuccess && onCreateSuccess();
        } else throw new Error(response.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    transportService({
      url: '/province',
    })
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedProvince)
      transportService({
        url: `/district?province_id=${selectedProvince}`,
      })
        .then((response) => {
          setDistricts(response.data);
        })
        .catch((error) => console.log(error));
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict)
      transportService({
        url: `/ward?district_id=${selectedDistrict}`,
      })
        .then((response) => {
          setWards(response.data);
        })
        .catch((error) => console.log(error));
  }, [selectedDistrict]);

  return (
    <Form
      form={form}
      colon={false}
      scrollToFirstError
      name="add_address"
      onFinish={handleSubmit}
      autoComplete="off"
      initialValues={{}}
      labelCol={{
        span: 6,
        style: {
          'text-align': 'left',
        },
      }}
    >
      <Form.Item
        label="Tỉnh/Thành Phố"
        name="province"
        rules={[
          {
            required: true,
            message: '*Bắt buộc',
          },
        ]}
      >
        <Select placeholder="Chọn Tỉnh/TP" onChange={handleProvinceSelect}>
          {provinces?.length > 0 &&
            provinces.map((item) => {
              return (
                <Option value={item.ProvinceID} key={item.ProvinceID}>
                  {item.ProvinceName}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: '*Bắt buộc',
          },
        ]}
        label="Quận/Huyện"
        name="district"
      >
        <Select placeholder="Chọn Quận/Huyện" onChange={handleDistrictSelect}>
          {districts?.map((item) => {
            return (
              <Option value={item.DistrictID} key={item.DistrictID}>
                {item.DistrictName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: '*Bắt buộc',
          },
        ]}
        label="Phường/Xã"
        name="ward"
      >
        <Select placeholder="Chọn Phường/Xã" onChange={handleWardSelect}>
          {wards?.map((item) => {
            return (
              <Option value={item.WardCode} key={item.WardCode}>
                {item.WardName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: '*Bắt buộc',
          },
        ]}
        label="Số nhà/Tên đường"
        name="street"
      >
        <Input
          onChange={handleStreetChange}
          placeholder="Nhập địa chỉ cụ thể"
        />
      </Form.Item>
      <Form.Item style={{ margin: '0' }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ display: 'flex', marginLeft: 'auto' }}
        >
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAddressForm;
