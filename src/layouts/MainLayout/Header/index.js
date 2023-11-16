import { BellFilled, LogoutOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row } from "antd";
import { useMemo, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./style.scss";
import { commonActions } from "../../../store/common";
import firebase from "../../../services/firebase";

const defaultHistories = [
  "bàn",
  "chuột không dây",
  "đèn bàn",
  "máy tính bảng",
  "balo",
  "điện thoại",
];

const Header = () => {
  const historiesArr = useRef(
    typeof JSON.parse(localStorage.getItem("history")) === "array" &&
      JSON.parse(localStorage.getItem("history"))?.length > 0
      ? JSON.parse(localStorage.getItem("history"))
      : defaultHistories
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo, notifications, isLogged } = useSelector(
    (state) => state.common
  );
  const [search, setSearch] = useState(null);
  const [histories, setHistories] = useState(historiesArr.current);

  const cartQty = useMemo(() => {
    const qty = cartItems.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);

    return qty;
  }, [cartItems]);

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSearch = () => {
    const value = search?.trim();

    if (!value) return;
    if (historiesArr.current?.length > 0) {
      let check = historiesArr.current.indexOf(value);

      if (check === -1) {
        if (historiesArr.current.length > 7) historiesArr.current.shift();

        historiesArr.current.push(value);
      }
    }
    else {
      historiesArr.current.push(value);
    }

    localStorage.setItem("history", JSON.stringify(historiesArr.current));
    setHistories(historiesArr.current);
    history.push(`/products?search=${value}`);
  };

  const handleLogin = () => {
    dispatch(commonActions.toggleLoginForm(true));
  };

  const handleRegister = () => {
    dispatch(commonActions.toggleRegisterForm(true));
  };

  const handleLogout = () => {
    handleLogin();
    firebase.auth().signOut();
    dispatch(commonActions.setUserInfo(''));
  };

  const handleRedirectCart = () => {
    if (!isLogged) return handleLogin();

    return history.push("/cart");
  };

  const menuAccount = (
    <Menu>
      <Menu.Item key={"notification"}>
        <Link to="/profile/notification">
          <BellFilled
            style={{
              fontSize: 18,
              marginLeft: 2,
              marginRight: 11,
              color: "var(--my-primary-color",
            }}
          />
          Thông báo của tôi
          {notifications > 0 && (
            <span className="badge_notification">{notifications}</span>
          )}
        </Link>
      </Menu.Item>
      <Menu.Item key="bill">
        <Link to="/profile/bill">
          <img
            src="/svg/my-order-header.svg"
            alt="my-order"
            className="my_order"
          />
          Đơn hàng của tôi
        </Link>
      </Menu.Item>
      <Menu.Item key="edit">
        <Link to="/profile/edit">
          <img
            src="/svg/my-account-header.svg"
            alt="my-order"
            className="my_account"
          />
          Tài khoản của tôi
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onClick={handleLogout}>
          <LogoutOutlined
            style={{
              marginLeft: 2,
              fontSize: 17,
              color: "var(--my-red)",
              marginRight: 10,
            }}
          />
          Thoát tài khoản
        </Link>
      </Menu.Item>
    </Menu>
  );
  const loginMenu = (
    <Menu>
      <Menu.Item key={"login"} onClick={handleLogin}>
        <Link to="#">
          <LogoutOutlined
            style={{
              marginLeft: 2,
              fontSize: 17,
              marginRight: 10,
            }}
          />
          Đăng nhập
        </Link>
      </Menu.Item>
      <Menu.Item key={"register"}>
        <Link to="/auth/register">
          <img
            src="/svg/my-account-header.svg"
            alt="my-order"
            className="my_account"
          />
          Đăng ký
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="header_main">
      <div className="container">
        <div className="header_main__wrap">
          <div className="header_main__top">
            <div className="header_main__top__wrap">
              <Row gutter={[{ xl: 16, lg: 16, md: 16, sm: 16, xs: 16 }, 16]}>
                <Col xl={18} lg={18} md={18} sm={18} xs={18}>
                  <div className="top_left">
                    <Row
                      gutter={[{ xl: 72, lg: 72, md: 24, sm: 24, xs: 24 }, 0]}
                    >
                      <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                        <div className="logo">
                          <Link className="logo_link" to="/">
                            <img src="/images/logo.png" alt="logo" />
                          </Link>
                        </div>
                      </Col>
                      <Col xl={19} lg={19} md={19} sm={19} xs={19}>
                        <div className="search">
                          <div className="search_wrap">
                            <input
                              type="text"
                              defaultValue=""
                              onChange={handleSearchChange}
                              placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                            />
                            <button onClick={handleSearch}>
                              <img
                                src="/images/search-icon.png"
                                alt="icon-search"
                              />
                              Tìm Kiếm
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  <div className="top_right">
                    <Dropdown
                      overlay={isLogged ? menuAccount : loginMenu}
                      arrow
                      placement="bottomCenter"
                      overlayClassName="overlay_account"
                    >
                      <div className="account">
                        <img
                          className="account_icon"
                          src="/images/user-icon.png"
                          alt="user"
                        />
                        <span className="account_text">
                          {userInfo._id !== "" ? (
                            <span className="nowrap">{`${userInfo.first_name} ${userInfo.last_name}`}</span>
                          ) : (
                            <span className="nowrap">Đăng Nhập / Đăng Ký</span>
                          )}
                          <span className="label">
                            <span>Tài khoản</span>
                            <img src="/images/arrow-icon.png" alt="arrow" />
                          </span>
                        </span>
                      </div>
                    </Dropdown>
                    <div className="cart" onClick={handleRedirectCart}>
                      <Link className="cart_link">
                        <div className="cart_wrap">
                          <img src="/images/cart-icon.png" alt="cart" />
                          <span>{userInfo._id ? cartQty : 0}</span>
                        </div>
                        <div className="cart_text">Giỏ Hàng</div>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="header_main__bottom">
            <div className="header_main__bottom__wrap">
              <Row gutter={[{ xl: 0, lg: 0, md: 0, sm: 0, xs: 0 }, 0]}>
                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Link className="badge" to="#">
                    <img src="/images/freeship-badge.png" alt="freeship" />
                  </Link>
                </Col>
                <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                  <div className="quicks_search">
                    {histories.map((item) => {
                      return (
                        <Link to={`/products?search=${item.trim()}`} key={item}>
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
