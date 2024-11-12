import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Carousel Example</h2>
      <Slider {...settings}>
        <div>
          <img src="/images/image1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="/images/image2.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="/images/image3.jpg" alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default hero;
