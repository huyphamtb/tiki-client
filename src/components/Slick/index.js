import Slider from "react-slick";
import "./style.scss";

const MySlick = ({
  children,
  arrows = false,
  md,
  xxl,
  lg,
  xl,
  autoPlay,
  dots = false,
}) => {
  const responsive = [
    {
      breakpoint: 1440,
      settings: {
        arrows,
        slidesToShow: xxl || 4,
        slidesToScroll: xxl || 4,
        infinite: false,
        autoPlay: autoPlay || false,
        dots,
      },
    },
    {
      breakpoint: 1366,
      settings: {
        arrows,
        slidesToShow: xl || 3,
        slidesToScroll: xl || 3,
        infinite: false,
        autoPlay: autoPlay || false,
        dots,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        arrows,
        slidesToShow: lg || 4,
        slidesToScroll: lg || 4,
        infinite: false,
        autoPlay: autoPlay || false,
        dots,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows,
        autoPlay: autoPlay || false,
        slidesToShow: md || 3,
        slidesToScroll: 1,
        infinite: false,
        dots,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows,
        autoPlay: autoPlay || false,
        slidesToShow: md || 1,
        slidesToScroll: 1,
        infinite: false,
        dots,
      },
    },
    {
      breakpoint: 0,
      settings: {
        arrows,
        autoPlay: autoPlay || false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots,
      },
    },
  ];

  const settings = {
    autoPlay: autoPlay || false,
    dots,
    infinite: false,
    speed: 500,
    slidesToShow: xl || 4,
    slidesToScroll: xl || 4,
    accessibility: false,
    responsive,
    centerPadding: 24,
  };

  return (
    <div className="my__slick">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default MySlick;
