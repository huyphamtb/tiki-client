import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

const Footer = () => {
  const { configs } = useSelector((state) => state.common) || {};

  const supportCustomerList = [
    { id: 1, link: configs?.hotline, hotline: true },
    { id: 2, link: "Các câu hỏi thường gặp" },
    { id: 3, link: "Gửi yêu cầu hỗ trợ" },
    { id: 4, link: "Hướng dẫn đặt hàng" },
    { id: 5, link: "Phương thức vận chuyển" },
    { id: 6, link: "Chính sách đổi trả" },
    { id: 7, link: "Hướng dẫn trả góp" },
    { id: 8, link: "Chính sách nhập khẩu" },
    { id: 9, security: "Hỗ trợ khách hàng: ", link: configs?.email },
    { id: 10, security: "Báo lỗi bảo mật: ", link: configs?.email },
  ];

  const aboutUsList = [
    { id: 1, link: `Giới thiệu ${configs?.page_name}` },
    { id: 2, link: "Tuyển dụng" },
    { id: 3, link: "Chính sách bảo mật thanh toán" },
    { id: 4, link: "Chính sách bảo mật thông tin cá nhân" },
    { id: 5, link: "Chính sách giải quyết khiếu nại" },
    { id: 6, link: "Điều khoản sử dụng" },
    { id: 7, link: `Giới thiệu ${configs?.page_name} Xu` },
    { id: 8, link: `Tiếp thị liên kết cùng ${configs?.page_name}` },
    { id: 9, link: "Bán hàng doanh nghiệp" },
  ];

  const paymentList = [
    { id: 1, icon: "/svg/payment-footer" },
    { id: 2, icon: "/svg/payment-footer" },
    { id: 3, icon: "/svg/payment-footer" },
    { id: 4, icon: "/svg/payment-footer" },
    { id: 5, icon: "/svg/payment-footer" },
    { id: 6, icon: "/svg/payment-footer" },
    { id: 7, icon: "/svg/payment-footer" },
    { id: 8, icon: "/svg/payment-footer" },
    { id: 9, icon: "/svg/payment-footer" },
    { id: 10, icon: "/svg/payment-footer" },
    { id: 11, icon: "/svg/payment-footer" },
  ];

  const socialsList = [
    { id: 1, icon: "/svg/facebook-footer.svg", link: configs?.facebook },
    { id: 2, icon: "/svg/youtube-footer.svg" },
    { id: 3, icon: "/svg/zalo-footer.svg" },
  ];

  return (
    <div id="footer_main">
      <div className="container">
        <div className="footer_main__wrap">
          <div className="footer_main__block">
            <h4 className="title">Hỗ trợ khách hàng</h4>
            <div className="footer_main__list">
              {supportCustomerList.map((supportCustomerItem) => {
                return (
                  <div
                    className="footer_main__item"
                    key={supportCustomerItem.id}
                  >
                    {supportCustomerItem.hotline ? (
                      <p className="hotline">
                        Hotline:
                        <Link to="#">{" " + supportCustomerItem.link}</Link>
                        <span>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
                      </p>
                    ) : supportCustomerItem.security ? (
                      <p className="security">
                        {supportCustomerItem.security}
                        <Link to="#">{supportCustomerItem.link}</Link>
                      </p>
                    ) : (
                      <Link to="#" className="footer">
                        {supportCustomerItem.link}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="footer_main__block">
            <h4 className="title">{`Về ${configs?.page_name}`}</h4>
            <div className="footer_main__list">
              {aboutUsList.map((aboutUsItem) => {
                return (
                  <div className="footer_main__item" key={aboutUsItem.id}>
                    <Link to="#" className="footer">
                      {aboutUsItem.link}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="footer_main__block">
            <h4 className="title">Hợp tác và liên kết</h4>
            <div className="footer_main__list">
              <div className="footer_main__item">
                <Link to="#" className="footer">
                  Quy chế hoạt động Sàn GDTMĐT
                </Link>
              </div>
              <div className="footer_main__item">
                <Link to="#" className="footer">
                  {`Bán hàng cùng ${configs?.page_name}`}
                </Link>
              </div>
            </div>
            <div className="certification">
              <h4 className="title">Chứng nhận bởi</h4>
              <div className="certification_list">
                <Link to="#" className="certification_item">
                  <img src="/svg/bo-cong-thuong-2.png" alt="bo-cong-thuong" />
                </Link>
              </div>
            </div>
          </div>
          <div className="footer_main__block">
            <h4 className="title">Phương thức thanh toán</h4>
            <p className="payment_list">
              {paymentList.map((paymentItem) => {
                return (
                  <span className="payment_item" key={paymentItem.id}>
                    <img
                      src={`${paymentItem.icon}-${paymentItem.id}.svg`}
                      alt="payment"
                    />
                  </span>
                );
              })}
            </p>
            <div className="service_ship">
              <h4 className="title">Dịch vụ giao hàng</h4>
              <Link to="#" className="icon">
                <img src="/svg/logistics-footer.svg" alt="logistics" />
              </Link>
            </div>
          </div>
          <div className="footer_main__block">
            <h4 className="title">Kết nối với chúng tôi</h4>
            <div className="socials_list">
              {socialsList.map((socialItem) => {
                return (
                  <Link
                    to={socialItem.link}
                    className="social_item"
                    key={socialItem.id}
                  >
                    <img src={socialItem.icon} alt="social" />
                  </Link>
                );
              })}
            </div>
            <div className="download">
              <h4 className="title">Tải ứng dụng trên điện thoại</h4>
              <div className="download_wrap">
                <div className="qr">
                  <img src="/svg/qrcode.png" alt="qr" />
                </div>
                <div className="apps_list">
                  <Link to="#" className="app_item">
                    <img src="/svg/appstore.png" alt="app-store" />
                  </Link>
                  <Link to="#" className="app_item">
                    <img src="/svg/playstore.png" alt="app-store" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <Row gutter={[{ xl: 16, lg: 16, md: 16, sm: 16, xs: 16 }, 0]}>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className="footer_main__block">
                <h4 className="title">Hỗ trợ khách hàng</h4>
                <div className="footer_main__list">
                  {supportCustomerList.map((supportCustomerItem) => {
                    return (
                      <div className="footer_main__item" key={supportCustomerItem.id}>
                        {supportCustomerItem.hotline ? (
                          <p className="hotline">
                            Hotline:
                            <Link to="#">{supportCustomerItem.link}</Link>
                            <span>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
                          </p>
                        ) : supportCustomerItem.security ? (
                          <p className="security">
                            {supportCustomerItem.security}
                            <Link to="#">{supportCustomerItem.link}</Link>
                          </p>
                        ) : (
                          <Link to="#" className="footer">
                            {supportCustomerItem.link}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className="footer_main__block">
                <h4 className="title">Về ${configs?.page_name}</h4>
                <div className="footer_main__list">
                  {aboutUsList.map((aboutUsItem) => {
                    return (
                      <div className="footer_main__item" key={aboutUsItem.id}>
                        <Link to="#" className="footer">
                          {aboutUsItem.link}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className="footer_main__block">
                <h4 className="title">Hợp tác và liên kết</h4>
                <div className="footer_main__list">
                  <div className="footer_main__item">
                    <Link to="#" className="footer">
                      Quy chế hoạt động Sàn GDTMĐT
                    </Link>
                  </div>
                  <div className="footer_main__item">
                    <Link to="#" className="footer">
                      Bán hàng cùng ${configs?.page_name}
                    </Link>
                  </div>
                </div>
                <div className="certification">
                  <h4 className="title">Chứng nhận bởi</h4>
                  <div className="certification_list">
                    <Link to="#" className="certification_item">
                      <img
                        src="https://frontend.${configs?.page_name}cdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                        alt="bo-cong-thuong"
                      />
                    </Link>
                    <Link to="#" className="certification_item">
                      <img
                        src="https://frontend.${configs?.page_name}cdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                        alt="bo-cong-thuong"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className="footer_main__block">
                <h4 className="title">Phương thức thanh toán</h4>
              </div>
            </Col>
            <Col>3</Col>
          </Row> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
