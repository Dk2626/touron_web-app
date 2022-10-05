import React from 'react';
import Slider from 'react-slick';
import './SliderImage.css';

export default function SliderImage() {
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
  };

  return (
    <>
      <Slider {...settings} accessibility pauseOnHover={false}>
        <div className='slide0 slide'>
          <div className='slider_title'>
            <h1>tour On</h1>
          </div>
        </div>
        <div className='slide1 slide'>
          <div className='slider_title'>
            <h1>tour On</h1>
          </div>
        </div>
        <div className='slide2 slide'>
          <div className='slider_title'>
            <h1>tour On</h1>
          </div>
        </div>
        <div className='slide3 slide'>
          <div className='slider_title'>
            <h1>tour On</h1>
          </div>
        </div>
        <div className='slide4 slide'>
          <div className='slider_title'>
            <h1>tour On</h1>
          </div>
        </div>
      </Slider>
    </>
  );
}
