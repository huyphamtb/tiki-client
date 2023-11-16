import { Button, Form, Input } from "antd";

const buttonItemLayout = {
  wrapperCol: { span: 8, offset: 18 },
};

const UpdateForm = ({
  icon,
  name,
  placeholder,
  rules,
  onSubmit,
  initialValue,
  loginWithGoogle,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Form form={form} onFinish={onSubmit} scrollToFirstError name={name}>
        <Form.Item
          colon={false}
          rules={rules}
          name={name}
          initialValue={initialValue}
        >
          <Input
            prefix={icon}
            placeholder={placeholder}
            defaultValue={initialValue}
          />
        </Form.Item>
        {!loginWithGoogle && (
          <Form.Item style={{ marginLeft: "auto" }} {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default UpdateForm;
