import "./style.scss";
import { Row, Col } from "antd";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img
        src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
        alt="next-arrow"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img
        src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
        alt="next-arrow"
      />
    </div>
  );
}

const Banner = () => {
  const { configs } = useSelector((state) => state.common);
  const banners = [
    configs?.banner_url_1,
    configs?.banner_url_2,
    configs?.banner_url_3,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="banner_home">
      <div className="banner_home__wrap">
        <Row gutter={[{ xl: 8, lg: 8, md: 8, sm: 8, xs: 8 }, 0]}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Link to="#" className="banner_home__sliders">
              <Slider {...settings}>
                {banners
                  .filter((item) => !!item)
                  .map((item) => {
                    return (
                      <div className="banner_home__slider" key={item?.image_id}>
                        <img src={item?.image_url} alt="banner" />
                      </div>
                    );
                  })}
              </Slider>
            </Link>
          </Col>
          <Col xl={8} lg={0} md={0} sm={0} xs={0}>
            <div className="banner_home__single">
              <img src={configs?.sub_banner?.image_url} alt="banner" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
