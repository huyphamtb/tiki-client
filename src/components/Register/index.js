import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AUTH_API from '../../api/auth';
import { STATUS_OK } from '../../constants/api';
import { commonActions } from '../../store/common';
import { fullnameReg, phoneReg } from '../../utils/validations';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};
const RegisterForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const redirect = (path) => {
    history.push(path);
  };

  const handleSuccessLogin = () => {
    //toast
    notification.success({
      placement: 'bottomLeft',
      message: 'Create account successfully',
      description: `Please login to Tiki`,
      duration: 3,
    });
    redirect('/auth/login');
  };

  const onFinish = async (values) => {
    const response = await AUTH_API.register(values);
    if (response.status === STATUS_OK) return handleSuccessLogin();

    notification.error({
      placement: 'bottomLeft',
      message: 'Create account failed!',
      description: response.message,
      duration: 3,
    });
  };

  useEffect(() => {
    dispatch(commonActions.toggleLoginForm(false));
  }, []);

  return (
    <div className="my-form">
      <div className="form-container hidden-scroll">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          colon={false}
          onFinish={onFinish}
          requiredMark={false}
          scrollToFirstError
        >
          {/* mail */}
          <Form.Item
            name="email"
            colon={false}
            label="E-mail*"
            labelAlign="left"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* username */}
          <Form.Item
            name="first_name"
            colon={false}
            label="First name*"
            labelAlign="left"
            rules={[
              {
                pattern: fullnameReg,
                message: 'The input is not valid first name!',
                whitespace: true,
              },
              { required: true, message: 'Please enter your first name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            colon={false}
            label="Last name*"
            labelAlign="left"
            rules={[
              {
                pattern: fullnameReg,
                message: 'The input is not valid last name!',
                whitespace: true,
              },
              { required: true, message: 'Please enter your last name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            colon={false}
            label="Phone number*"
            labelAlign="left"
            rules={[
              {
                pattern: phoneReg,
                message: 'The input is not valid phone number!',
                whitespace: true,
              },
              { required: true, message: 'Please enter your phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            colon={false}
            label="Password*"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
              {
                min: 6,
                message: 'Please enter your password more than 6 characters!!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* confirm password */}
          <Form.Item
            name="confirm"
            colon={false}
            label="Confirm Password*"
            labelAlign="left"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* check */}
          <Form.Item
            name="agreement"
            colon={false}
            valuePropName="checked"
            labelAlign="left"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox
              style={{
                fontWeight: 'bold',
              }}
            >
              I agree to the <Link to="">{'Terms & Conditions'}</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: 'var(--my-primary-color)',
                borderRadius: 99999,
                border: 'none',
                marginTop: 22,
                marginBottom: 12,
                fontWeight: 'bold',
                fontSize: 14,
              }}
              block
              size="large"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="form-redirect">
          <span>Already have an Account?</span>
          <Link to="/auth/login"> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
