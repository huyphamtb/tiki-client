import { Form, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const PasswordUpdate = ({ onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <div className="update-container">
      <Form
        {...formItemLayout}
        requiredMark={false}
        form={form}
        name="updatePassword"
        colon={false}
        onFinish={onSubmit}
      >
        <Form.Item
          name="old_password"
          label="Nhập mật khẩu cũ"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập vào mật khẩu cũ của bạn.',
            },
            {
              min: 6,
              message: 'Mật khẩu có độ dài từ 6 ký tự trở lên.',
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Nhập mật khẩu mới"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập vào mật khẩu của bạn.',
            },
            {
              min: 6,
              message: 'Mật khẩu có độ dài từ 6 ký tự trở lên.',
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu mới"
          labelAlign="left"
          dependencies={['new_password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận lại mật khẩu của bạn.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Mật khẩu bạn nhập không trùng khớp!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <Button
          style={{ marginLeft: 'auto', display: 'block' }}
          type="primary"
          htmlType="submit"
        >
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default PasswordUpdate;
