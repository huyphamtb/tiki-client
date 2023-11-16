import { CloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import ADDRESS_API from './api/address';
import AUTH_API from './api/auth';
import CART_API from './api/cart';
import CONFIGS_API from './api/config';
import LoginForm from './components/Login';
import { STATUS_FAIL, STATUS_OK } from './constants/api';
import './index.css';
import MainLayout from './layouts/MainLayout';
import Result from './layouts/Result';
import SignLayout from './layouts/SignLayout';
import RegisterForm from './pages/Register/components/RegisterForm';
import { cartActions } from './store/cart';
import { commonActions } from './store/common';
import createSocketClient from './utils/ws';

function App() {
  const dispatch = useDispatch();
  const { userInfo, notifications, configs, loginForm, registerForm } =
    useSelector((state) => state.common);
  const notificationSound = new Audio('/sound/notification_sound.wav');
  const { pathname } = useLocation();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCloseLoginForm = () => {
    dispatch(commonActions.toggleLoginForm(false));
  };

  useEffect(() => {
    (async function () {
      if (!userInfo._id || userInfo._id === '') return;

      const notificationSocket = await createSocketClient(
        `/notification/${userInfo._id}`
      );

      notificationSocket.addEventListener('message', ({ data }) => {
        notificationSound.play();

        notification.info({
          placement: 'topRight',
          message: 'Notification',
          description: data,
          duration: 3,
        });

        dispatch(commonActions.setNotifications(notifications + 1));
      });
    })();
  }, [userInfo]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    AUTH_API.verify(token)
      .then((response) => {
        if (response.status === STATUS_FAIL) return console.log('Not logged!');

        dispatch(commonActions.setUserInfo(response.data));
        dispatch(commonActions.toggleLogged(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!userInfo._id || userInfo._id === '') return;

    CART_API.queryCart(userInfo._id)
      .then((response) => {
        if (response.status === STATUS_FAIL)
          return console.log(response.message);

        dispatch(cartActions.loadCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo]);

  useEffect(() => {
    CONFIGS_API.getConfigs()
      .then((response) => {
        if (response.status === STATUS_OK)
          dispatch(commonActions.setConfigs(response.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!userInfo._id) return;

    ADDRESS_API.getAddressesByUser(userInfo._id)
      .then((response) => {
        if (response.status === STATUS_OK)
          dispatch(commonActions.setAddresses(response.data));
        else throw new Error(response.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo._id]);

  useEffect(() => {
    scrollTop();
  }, [pathname]);

  return (
    <div className="App">
      {loginForm && (
        <div className="auth__form-wrapper">
          <div className="form-block">
            <button className="close__form-btn" onClick={handleCloseLoginForm}>
              <CloseOutlined style={{ color: 'rgb(78, 78, 78)' }} />
            </button>
            <LoginForm />
          </div>
        </div>
      )}
      {/* {registerForm && (
        <div className="auth__form-wrapper">
          <div className="form-block">
            <button className="close__form-btn" onClick={handleCloseRegisterForm}>
              <CloseOutlined style={{ color: "rgb(78, 78, 78)" }} />
            </button>
            <RegisterForm />
          </div>
        </div>
      )} */}
      {/* <div className="auth__form-wrapper">
        <div className="form-block">
          <RegisterForm />
        </div>
      </div> */}
      <Switch>
        <Route path="/success">
          <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle={`Đơn hàng của bạn đang được xác nhận. Cảm ơn bạn đã tin tưởng ${configs?.page_name}.`}
          />
        </Route>
        <Route path="/auth">
          <SignLayout />
        </Route>
        <Route path="/">
          <MainLayout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
