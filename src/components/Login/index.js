import { Button, Checkbox, Divider, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AUTH_API from "../../api/auth";
import { STATUS_FAIL, STATUS_OK } from "../../constants/api";
import firebase from "../../services/firebase";
import { commonActions, initState } from "../../store/common";
import { splitFullName } from "../../utils";

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

    notification.success({
      placement: "topRight",
      message: "Login success!",
      description: userInfoResponse.message,
      duration: 3,
    });

    dispatch(commonActions.setUserInfo(userInfoResponse.data));
    dispatch(commonActions.toggleLogged(true));
    dispatch(commonActions.toggleLoginForm(false));
    localStorage.setItem("access_token", data.token);
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

  const handleSuccessLoginWithGoogle = async (data) => {
    const userInfoResponse = await AUTH_API.verify(data.token);
    if (userInfoResponse.status === STATUS_FAIL)
      return notification.error({
        placement: "bottomLeft",
        message: "Login failed!",
        description: userInfoResponse.message,
        duration: 3,
      });
    notification.success({
      placement: "topRight",
      message: "Login success!",
      description: userInfoResponse.message,
      duration: 3,
      maxCount: 1,
    });

    dispatch(commonActions.setUserInfo(userInfoResponse.data));
    dispatch(commonActions.toggleLogged(true));
    dispatch(commonActions.toggleLoginForm(false));
    localStorage.setItem("login_with_google", true);
    localStorage.setItem("access_token", data.token);
  };

  const handleLoginWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          return console.log("User not logged in");
        }

        // const token = await user.getIdToken();
        const fullName = splitFullName(user.displayName);

        const data = {
          email: user.email,
          first_name: fullName.first_name,
          last_name: fullName.last_name,
          avt_url: user.photoURL,
        };

        const response = await AUTH_API.loginWithGoogle(data);
        if (response.status === STATUS_OK)
          return handleSuccessLoginWithGoogle(response.data);

        notification.error({
          placement: "bottomLeft",
          message: "Login failed!",
          description: response.message,
          duration: 3,
        });
      });

    return () => unregisterAuthObserver();
  };

  const handleCloseLoginForm = () => {
    dispatch(commonActions.toggleLoginForm(false));
  };

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("login_with_google");
    dispatch(commonActions.toggleLogged(false));
    dispatch(commonActions.setUserInfo(initState.userInfo));

    // const body = document.querySelector('body');
    // body.style.overflow = 'hidden';
    // return () => body.style.overflow = 'auto'
  }, []);

  return (
    <div className="my-form">
      <div className="form-container hidden-scroll">
        {!isHome && (
          <div className="form-header">
            <h1>Sign In</h1>
            <p>Login account to manage your chatbot</p>
          </div>
        )}
        {/* <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        /> */}
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
            onClick={handleLoginWithGoogle}
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
            <Link onClick={handleCloseLoginForm} to="/auth/register">
              {" "}
              Create an Account
            </Link>
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
