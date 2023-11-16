import { Button, Checkbox, Divider, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AUTH_API from "../../../api/auth";
import { STATUS_OK, STATUS_FAIL } from "../../../constants/api";
import { commonActions, initState } from "../../../store/co mmon";

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

const LoginForm = ({ isHome }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const redirect = (path) => {
    history.push(path);
  };

  const handleSuccessLogin = async (data) => {
    const userInfoResponse = await AUTH_API.verify(data.token);
    if (userInfoResponse.status === STATUS_FAIL)
      return notification.error({
        placement: "bottomLeft",
        message: "Login failed!",
        description: userInfoResponse.message,
        duration: 3,
      });

    dispatch(commonActions.setUserInfo(userInfoResponse.data));
    dispatch(commonActions.toggleLogged(true));
    localStorage.setItem("access_token", data.token);
    redirect("/");
  };

  const onFinish = async (values) => {
    const response = await AUTH_API.login(values);

    if (response.status === STATUS_OK) return handleSuccessLogin(response.data);

    notification.error({
      placement: "bottomLeft",
      message: "Login failed!",
      description: response.message,
      duration: 3,
    });
  };

  useEffect(() => {
    localStorage.removeItem("access_token");
    dispatch(commonActions.toggleLogged(false));
    dispatch(commonActions.setUserInfo(initState.userInfo));
  }, []);

  return (
    <div className="my-form">
      <div className="form-container hidden-scroll">
        {!isHome && (
          <div className="form-header">
            <h1>Sign In</h1>
            <p>Login account to manage your business</p>
          </div>
        )}
        <div className="google-auth">
          <Button
            type="primary"
            ghost
            block
            size="large"
            style={{
              borderRadius: 9999,
              borderColor: "rgb(228, 228, 228)",
              boxShadow: "none",
              fontSize: 14,
              color: "rgba(36, 36, 36, 0.826)",
              fontWeight: "bold",
            }}
          >
            <img src="/svg/google.svg" alt="Login with Google" />
            Sign In with Google
          </Button>
        </div>
        <Divider style={{ fontSize: 13 }} className="form-divider">
          Or Sign In with email
        </Divider>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          colon={false}
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
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
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
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
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Please input your password more than 6 characters!!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* check */}
          <Form.Item
            name="saveAccount"
            colon={false}
            valuePropName="checked"
            labelAlign="left"
            {...tailFormItemLayout}
          >
            <Checkbox
              style={{
                fontWeight: "bold",
              }}
            >
              Remember me
            </Checkbox>
            <Link className="forget-password" to="/password-reset">
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "var(--my-primary-color)",
                borderRadius: 99999,
                border: "none",
                marginTop: 22,
                marginBottom: 12,
                fontWeight: "bold",
                fontSize: 14,
              }}
              block
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        {!isHome && (
          <div className="form-redirect">
            <span>Not registed yet?</span>
            <Link to="/auth/register"> Create an Account</Link>
          </div>
        )}
        {/* <div className='form-trademark'>
          <span>@mb1o4er 2021</span>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
