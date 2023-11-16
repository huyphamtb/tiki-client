import {
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, notification, Radio } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import USER_API from "../../../../api/user";
import LoadingSection from "../../../../components/LoadingSection";
import { STATUS_FAIL, STATUS_OK } from "../../../../constants/api";
import { BISEXUAL, FEMALE, MALE } from "../../../../constants/gender";
import { commonActions } from "../../../../store/common";
import { fullnameReg } from "../../../../utils/validations";
import AddressUpdate from "../AddressUpdate";
import EmailUpdate from "../EmailUpdate";
import PasswordUpdate from "../PasswordUpdate";
import PhoneUpdate from "../PhoneUpdate";
import UpdateItem from "../UpdateItem/UpdateItem";
import "./style.scss";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const Account = () => {
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const loginWithGoogle = localStorage.getItem("login_with_google");

  const submit = async (values) => {
    try {
      const payloadData = _.omitBy(values, (value) => {
        if (value || value?.trim() !== "") return false;
        return true;
      });

      if (payloadData.last_name)
        payloadData.last_name = payloadData.last_name.trim();
      if (payloadData.first_name)
        payloadData.first_name = payloadData.first_name.trim();
      if (payloadData.address) payloadData.address = payloadData.address.trim();
      if (payloadData.password)
        payloadData.password = payloadData.password.trim();

      const response = await USER_API.updateUser(userInfo._id, payloadData);

      if (response.status === STATUS_FAIL)
        return notification.error({
          placement: "topRight",
          message: "Can not update cart!",
          description: response.message,
          duration: 3,
        });

      dispatch(commonActions.setUserInfo(response.data));
      return notification.success({
        placement: "topRight",
        message: "Success",
        description: "Cập nhật thành công!",
        duration: 3,
      });
    } catch (error) {
      return console.log(error.message);
    }
  };

  const submitUpdatePassword = async (values) => {
    const { old_password, new_password } = values;
    try {
      const response = await USER_API.updatePassword(userInfo._id, {
        old_password,
        new_password,
      });

      if (response.status === STATUS_OK)
        notification.success({
          placement: "topRight",
          message: "Update password success!",
          description: response.message,
          duration: 3,
        });
      else
        notification.error({
          placement: "topRight",
          message: "Lỗi",
          description: response.message,
          duration: 3,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account">
      {!userInfo ? (
        <LoadingSection />
      ) : (
        <>
          <div className="account__left">
            <div className="account-heading">
              <p>Thông tin cá nhân</p>
            </div>
            <div className="account__left-form">
              <Form
                {...formItemLayout}
                form={form}
                name="account"
                colon={false}
                onFinish={submit}
                requiredMark={false}
                scrollToFirstError
              >
                <div className="user__name__fields-container">
                  <Form.Item
                    name="last_name"
                    colon={false}
                    label="Họ"
                    labelAlign="left"
                    rules={[
                      {
                        pattern: fullnameReg,
                        message: "Họ & Tên không được bao gồm kí tự đặc biệt.",
                      },
                    ]}
                  >
                    <Input placeholder={userInfo.last_name} />
                  </Form.Item>
                  <Form.Item
                    name="first_name"
                    colon={false}
                    label="Tên"
                    labelAlign="left"
                    style={{ marginLeft: 16 }}
                    rules={[
                      {
                        pattern: fullnameReg,
                        message: "Họ & Tên không được bao gồm kí tự đặc biệt.",
                      },
                    ]}
                  >
                    <Input placeholder={userInfo.first_name} />
                  </Form.Item>
                </div>
                <Form.Item
                  name="sex"
                  colon={false}
                  label="Giới tính"
                  labelAlign="left"
                >
                  <Radio.Group value={userInfo.sex}>
                    <Radio value={MALE}>Nam</Radio>
                    <Radio value={FEMALE}>Nữ</Radio>
                    <Radio value={BISEXUAL}>Khác</Radio>
                  </Radio.Group>
                </Form.Item>
                <Button
                  style={{ marginLeft: "auto", display: "block" }}
                  type="primary"
                  htmlType="submit"
                >
                  Lưu thay đổi
                </Button>
              </Form>
            </div>
          </div>
          <div className="account__right">
            <div className="update-list">
              <div className="account-heading">
                <p>Thông tin chi tiết</p>
              </div>
              <UpdateItem
                icon={<PhoneOutlined />}
                title="Số điện thoại"
                content={userInfo.phone}
                btnContent="Cập nhật"
                component={
                  <PhoneUpdate
                    onSubmit={submit}
                    initialValue={userInfo.phone}
                  />
                }
              />
              <UpdateItem
                icon={<MailOutlined />}
                title="Địa chỉ email"
                content={userInfo.email}
                btnContent="Cập nhật"
                component={
                  <EmailUpdate
                    loginWithGoogle={loginWithGoogle}
                    onSubmit={submit}
                    initialValue={userInfo.email}
                  />
                }
              />
              <UpdateItem
                icon={<EnvironmentOutlined />}
                title="Địa chỉ"
                btnContent="Cập nhật"
                content="Cập nhật địa chỉ nhận hàng"
                component={
                  <AddressUpdate onSubmit={submit} initialValue={{}} />
                }
              />
            </div>
            <div className="update-list">
              <div className="account-heading">
                <p>Bảo mật</p>
              </div>
              {!loginWithGoogle && (
                <UpdateItem
                  icon={<LockOutlined />}
                  title="Thiết lập mật khẩu"
                  btnContent="Cập nhật"
                  component={<PasswordUpdate onSubmit={submitUpdatePassword} />}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
