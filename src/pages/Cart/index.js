import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Modal, notification, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CART_API from '../../api/cart';
import LoadingSection from '../../components/LoadingSection';
import UpdateAddressForm from '../../components/UpdateAddressForm';
import { STATUS_FAIL } from '../../constants/api';
import { cartActions } from '../../store/cart';
import { formatNumber, getSalePrice } from '../../utils';
import ProductCart from './ProductCart';
import './style.scss';

const CartPage = () => {
  const { userInfo, addresses } = useSelector((state) => state.common);
  const [address, setAddress] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const [checkedAll, setCheckedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addressModalVisibled, setAddressModalVisibled] = useState(false);

  useEffect(() => {
    const defaultAddr = addresses?.length > 0 ? addresses[0] : null;
    setAddress(defaultAddr);
  }, [addresses]);
  console.log(address)

  useEffect(() => {
    if (!userInfo._id || userInfo._id === '') return;

    CART_API.queryCart(userInfo._id)
      .then((response) => {
        if (response.status === STATUS_FAIL)
          return console.log(response.message);

        dispatch(cartActions.loadCart(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo]);

  const cartQty = useMemo(() => {
    const qty = cartItems.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);

    return qty;
  }, [cartItems]);

  const checkedProducts = useMemo(() => {
    return cartItems.filter((item) => item.selected);
  }, [cartItems]);

  const checkedQty = useMemo(() => {
    const qty = checkedProducts.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);

    return qty;
  }, [checkedProducts]);

  const totalAmount = useMemo(() => {
    const total = checkedProducts.reduce((prev, cur) => {
      return (
        prev +
        cur.quantity * getSalePrice(cur.product.price, cur.product.sale_percent)
      );
    }, 0);

    return total;
  }, [checkedProducts]);

  const handleChecking = (checked, _id) => {
    const selectedItem = cartItems.find((item) => item._id === _id);
    const newData = { ...selectedItem, selected: !checked };


    dispatch(cartActions.updateCart(newData));
  };

  const switchAddressModal = (status) => {
    setAddressModalVisibled(status);
  };

  const handleSelectAll = ({ target: { checked } }) => {
    let newItems = [];
    newItems = cartItems.map((item) => ({
      ...item,
      selected: checked,
    }));

    dispatch(cartActions.loadCart(newItems));
    setCheckedAll(checked);
  };

  const handleSubmit = () => {
    if (!checkedProducts?.length)
      return notification.error({
        placement: 'topRight',
        message: 'Error!',
        description: 'Bạn chưa chọn sản phẩm nào!',
        duration: 3,
      });

    if (!address)
      return notification.error({
        placement: 'topRight',
        message: 'Error!',
        description: 'Vui lòng chọn địa chỉ nhận hàng!',
        duration: 3,
      });

    localStorage.setItem('temp_order', JSON.stringify(checkedProducts));
    localStorage.setItem('temp_address', JSON.stringify(address));
    history.push('/checkout');
  };

  const handleSelectAddress = (data) => {
    setAddress(data);
    switchAddressModal(false);
  };

  return (
    <div id="cart_page">
      <Modal
        visible={addressModalVisibled}
        title={<strong>Chọn địa chỉ giao hàng</strong>}
        footer={null}
        onCancel={() => switchAddressModal(false)}
        destroyOnClose
      >
        <UpdateAddressForm onSelectAddress={handleSelectAddress} />
      </Modal>
      <div className="container">
        <div className="cart_page__wrap">
          <div className="cart_page__header">
            <div className="cart_page__header__wrap">
              <Link to="/" className="cart_page__header__navigation">
                <img src="/svg/arrow-prev-cart.svg" alt="navigation" />
              </Link>
              <div className="cart_page__header__title">
                Giỏ hàng <span>({cartQty})</span>
              </div>
            </div>
          </div>
          <h4 className="cart_page__title">GIỎ HÀNG</h4>
          <div className="cart_page__body cart_page__body__response">
            <Row
              gutter={[
                { xl: 16, lg: 16, md: 16, sm: 16, xs: 16 },
                { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              ]}
              className="body_response__row"
            >
              <Col xl={18} lg={24} md={24} sm={24} xs={24}>
                <div className="cart_products">
                  <div className="cart_products__wrap">
                    <Row gutter={[0, { xl: 16, lg: 0, md: 0, sm: 0, xs: 0 }]}>
                      <Col
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        className="col_header"
                      >
                        <div className="cart_products__header">
                          {!loading && !cartItems?.length ? (
                            <h2>
                              Chưa có sản phẩm trong giỏ hàng!
                              <Link style={{ marginLeft: 4 }} to="/">
                                Tiếp tục mua sắm
                              </Link>
                            </h2>
                          ) : (
                            <Row
                              gutter={[
                                { xl: 0, lg: 0, md: 0, sm: 0, xs: 0 },
                                0,
                              ]}
                            >
                              <Col xl={11} lg={20} md={20} sm={20} xs={20}>
                                <label
                                  htmlFor="checkboxAll"
                                  className="checkbox_all checkbox_product"
                                >
                                  <input
                                    defaultValue={false}
                                    type="checkbox"
                                    id="checkboxAll"
                                    onChange={handleSelectAll}
                                  />
                                  <span className="checkbox_fake"></span>
                                  <span className="label">
                                    Tất cả ({cartQty} sản phẩm)
                                  </span>
                                </label>
                              </Col>
                              <Col xl={5} lg={0} md={0} sm={0} xs={0}>
                                <div className="title__field price_one">
                                  Đơn giá
                                </div>
                              </Col>
                              <Col xl={4} lg={0} md={0} sm={0} xs={0}>
                                <div className="title__field quantity">
                                  Số lượng
                                </div>
                              </Col>
                              <Col xl={3} lg={0} md={0} sm={0} xs={0}>
                                <div className="title__field total_price">
                                  Thành tiền
                                </div>
                              </Col>
                              <Col xl={1} lg={4} md={4} sm={4} xs={4}>
                                <div className="delete_product">
                                  <img src="/svg/trash.svg" alt="delete" />
                                </div>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        {loading && <LoadingSection />}
                        {!loading && cartItems.length > 0 && (
                          <div className="products_cart__list">
                            {cartItems.map((item) => {
                              return (
                                <div
                                  className="product_cart__item"
                                  key={item._id}
                                >
                                  <ProductCart
                                    handleChecking={handleChecking}
                                    checkedAll={checkedAll}
                                    data={item}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                <div className="cart_total__prices">
                  <div className="cart_total__prices__wrap">
                    <Row
                      gutter={[0, { xl: 16, lg: 16, md: 16, sm: 16, xs: 16 }]}
                    >
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className="ship_address">
                          <div className="ship_address__wrap">
                            <div className="heading">
                              <div className="text">Giao tới</div>
                              <span
                                onClick={() => switchAddressModal(true)}
                                className="change_address"
                              >
                                Thay đổi
                              </span>
                            </div>
                            <div className="title">
                              <div className="icon">
                                <img
                                  src="/svg/address-cart.svg"
                                  alt="address"
                                />
                              </div>
                              <div className="name">{`${userInfo.last_name} ${userInfo.first_name}`}</div>
                              <div className="phone">{userInfo.phone}</div>
                            </div>
                            {address ? (
                              <div className="address">{`${address.street}, P.${address.ward.name}, Q.${address.district.name}, ${address.province.name}`}</div>
                            ) : (
                              <>
                                <Alert
                                  onClick={() => switchAddressModal(true)}
                                  type="warning"
                                  description="Vui lòng thêm địa chỉ giao hàng"
                                />
                                <Button
                                  type="text"
                                  onClick={() => switchAddressModal(true)}
                                >
                                  <strong>
                                    <PlusOutlined style={{ marginRight: 4 }} />
                                    Thêm địa chỉ
                                  </strong>
                                </Button>
                              </>
                            )}
                          </div>
                          <Link to="#" className="ship_address__navigation">
                            <img
                              src="/svg/arrow-next-cart.svg"
                              alt="navigation"
                            />
                          </Link>
                        </div>
                      </Col>

                      <Col xl={24} lg={0} md={0} sm={0} xs={0}>
                        <div className="cart_prices">
                          <div className="cart_prices__wrap">
                            <ul className="price_list">
                              <li className="price_item">
                                <span className="price_item__text">
                                  Tạm tính
                                </span>
                                <span className="price_item__value">
                                  {formatNumber(totalAmount)}₫
                                </span>
                              </li>
                              <li className="price_item">
                                <span className="price_item__text">
                                  Giảm giá
                                </span>
                                <span className="price_item__value">0đ</span>
                              </li>
                            </ul>
                            <div className="prices_total">
                              <div className="prices_total__text">
                                Tổng cộng
                              </div>
                              <div className="prices_total__content">
                                <div className="final">
                                  {formatNumber(totalAmount)}₫
                                </div>
                                <div className="note">
                                  (Đã bao gồm VAT nếu có)
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl={24} lg={0} md={0} sm={0} xs={0}>
                        <div className="cart_submit">
                          <button
                            onClick={handleSubmit}
                            className="cart_submit__btn"
                          >
                            Mua Hàng ({checkedQty})
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/* <div className="cart_page__footer">
            <div className="cart_page__footer__wrap">
              <div className="footer_prices">
                <div className="footer_prices__wrap ">
                  <div className="footer_prices__left">
                    <div className="left_title">Tổng cộng</div>
                    {checkedQty > 0 && (
                      <div className="left_text">Vui lòng chọn sản phẩm</div>
                    )}
                  </div>
                  <div className="footer_prices__right">
                    <div onClick={handleSubmit} className="right_button">
                      Mua hàng ({checkedQty})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
