import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, InputNumber, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CART_API from "../../../api/cart";
import { STATUS_FAIL } from "../../../constants/api";
import { cartActions } from "../../../store/cart";
import { formatNumber, getSalePrice } from "../../../utils";
import "./style.scss";

const ProductCart = ({ data, checkedAll, handleChecking }) => {
  const dispatch = useDispatch();

  const [checkedProduct, setCheckedProduct] = useState(false);

  const confirmDelete = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        CART_API.removeCartItems({
          _ids: [data._id],
        })
          .then((response) => {
            if (response.status === STATUS_FAIL)
              return notification.error({
                placement: "topRight",
                message: "Can not remove cart item!",
                description: response.message,
                duration: 3,
              });

            dispatch(cartActions.removeCartItem(data._id));
            notification.success({
              placement: "topRight",
              message: "Successfully!",
              description: response.message,
              duration: 3,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  const handleChangeQty = (value) => {
    if (value === 0) {
      return confirmDelete();
    }

    updateCartItem({
      ...data,
      product_id: data.product._id || data.product,
      quantity: value,
    });
  };

  const updateCartItem = async (itemData) => {
    try {
      const response = await CART_API.addToCart(itemData);
      if (response.status === STATUS_FAIL)
        return notification.error({
          placement: "topRight",
          message: "Can not update cart!",
          description: response.message,
          duration: 3,
        });

      dispatch(cartActions.updateCart(itemData));

      return notification.success({
        placement: "topRight",
        message: "Successfully!",
        description: response.message,
        duration: 3,
      });
    } catch (error) {
      return notification.error({
        placement: "topRight",
        message: "Can not update cart!",
        description: error.message,
        duration: 3,
      });
    }
  };

  const handleChange = () => {
    setCheckedProduct(!checkedProduct);
    handleChecking(checkedProduct, data._id);

  };

  useEffect(() => {
    if (checkedAll) setCheckedProduct(true);
    else setCheckedProduct(false);
  }, [checkedAll]);

  return (
    <div id="product_cart">
      <div className="product_cart__wrap">

        <div className="product_cart__intended">
          <div className="product_cart__intended__wrap">
            <div className="intended_info">
              <label htmlFor={data._id} className="checkbox_product">
                <input
                  type="checkbox"
                  id={data._id}
                  defaultValue={false}
                  checked={checkedProduct}
                  onChange={handleChange}
                  disabled={data.product.stock === 0}
                />
                <span className="checkbox_fake"></span>
              </label>
              <Link
                to={`/products/${data.product?.slug}`}
                className="intended_info__img"
              >
                <img src={data.product?.thumbnail_url} alt="detail" />
              </Link>
            </div>
            <div className="intended_sub__content">
              <Row
                gutter={[
                  { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                  { xl: 7, lg: 7, md: 7, sm: 7, xs: 7 },
                ]}
              >
                <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                  <Link to="#" className="intended_main">
                    <img src="/svg/tikifast.png" alt="tiki-fast" />
                    {data.product?.name}
                  </Link>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <div className="intended_price">
                    <span className="real_price">
                      {formatNumber(
                        (data.product?.price / 100) *
                        (100 - data.product?.sale_percent)
                      )}
                      ₫
                    </span>
                    <span className="discount_price">
                      {formatNumber(data.product?.price)}₫
                    </span>
                  </div>
                </Col>
                <Col xl={5} lg={24} md={24} sm={24} xs={24}>
                  <div className="intended_quantity">
                    <div className="intended_quantity__content">
                      <InputNumber
                        min={1}
                        max={data.product?.stock}
                        defaultValue={data.quantity}
                        onChange={handleChangeQty}
                      />
                    </div>
                    <Link
                      to="#"
                      className="intended_delete__response"
                      onClick={confirmDelete}
                    >
                      Xóa
                    </Link>
                  </div>
                </Col>
                <Col xl={3} lg={0} md={0} sm={0} xs={0}>
                  <div className="final_price">
                    {formatNumber(
                      getSalePrice(
                        data.product?.price,
                        data.product?.sale_percent
                      ) * data.quantity
                    )}
                    đ
                  </div>
                </Col>
              </Row>
            </div>
            <div className="intended_delete" onClick={confirmDelete}>
              <img src="/svg/trash.svg" alt="trash" />
            </div>
          </div>
        </div>
        <div className="product_cart__discount">
          <div className="product_cart__discount__wrap">
            <div className="description">Shop Khuyến Mãi</div>
            <div className="note">Vui lòng chọn sản phẩm trước</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
