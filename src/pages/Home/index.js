import { Link } from "react-router-dom";
import Banner from "./Banner";
import BrandWidget from "./BrandWidget";
import Events from "./Events";
import FeatureCategories from "./FeatureCategories";
import "./style.scss";
import TodaySuggest from "./TodaySuggest";

const HomePage = () => {
  return (
    <div id="home_page">
      <div className="container">
        <div className="home_page__wrap">
          <div className="home_page__header">
            <div className="home_page__header__wrap">
              <div className="header_skeleton">
                <div className="header_skeleton__wrap">
                  <div className="header_skeleton__info">
                    <div to="#" className="info_sale">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
                        alt="sale"
                      />
                    </div>
                    <div to="#" className="info_logo">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/d4/ca/89/28d85ed27396c1beebad8a3fec18bfe4.png"
                        alt="sale"
                      />
                    </div>
                    <div to="#" className="info_notification">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/c5/0b/06/88e5d7fa1a7cb51144fff2933e7269d9.png"
                        alt="sale"
                      />
                    </div>
                    <Link to="/cart" className="info_cart">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/70/44/6c/a5ac520d156fde81c08dda9c89afaf37.png"
                        alt="sale"
                      />
                    </Link>
                  </div>
                  <Link to="#" className="header_skeleton__search">
                    <div className="search_icon">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/34/62/0c/6ae13efaff83c66f810c4c63942cf6c0.png"
                        alt="search"
                      />
                    </div>
                    <input
                      className="search_input"
                      type="search"
                      placeholder="Bạn tìm gì hôm nay?"
                      defaultValue=""
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="home_page__header__background">
              <img
                src="https://salt.tikicdn.com/cache/w500/ts/banner/93/14/64/a76974ee902d46703958dc7c9eaa2a46.png.webp"
                alt="background"
              />
            </div>
          </div>
          <Banner />
          <Events />
          <BrandWidget />
          <FeatureCategories />
          <TodaySuggest />
          <div className="home_page__navigation">
            <div className="home_page__navigation__wrap">
              <div className="navigation_list">
                <Link to="#" className="navigation_item navigation_item__home">
                  <div className="icon">
                    <img
                      src="https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/active-home.png"
                      alt="icon"
                    />
                  </div>
                  <div className="title">Trang Chủ</div>
                </Link>
                <Link to="#" className="navigation_item">
                  <div className="icon">
                    <img
                      src="https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/cate.png"
                      alt="icon"
                    />
                  </div>
                  <div className="title">Danh Mục</div>
                </Link>
                <Link to="#" className="navigation_item">
                  <div className="icon">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/c3/9b/0e/1867ff54d9f4d07f3f7fe1a7f19a79ee.png"
                      alt="icon"
                    />
                  </div>
                  <div className="title">Lướt</div>
                </Link>
                <Link to="#" className="navigation_item">
                  <div className="icon">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/b6/cb/1d/34cbe52e6c2566c5033103c847a9d855.png"
                      alt="icon"
                    />
                  </div>
                  <div className="title">Chat</div>
                </Link>
                <Link to="#" className="navigation_item">
                  <div className="icon">
                    <img
                      src="https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/account.png"
                      alt="icon"
                    />
                  </div>
                  <div className="title">Cá Nhân</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
