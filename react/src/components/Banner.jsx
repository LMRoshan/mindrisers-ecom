import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Img1 from "../assets/img1.png";
import Img2 from "../assets/img2.png";
import Img3 from "../assets/img3.png";
import Img4 from "../assets/img4.png";
import Img5 from "../assets/img5.png";
import "../App.css"

const style = {
  width: "400px",
  height: "250px",
  objectFit: "contain",
};

const Banner = () => {
  return (
    <div className="mt-5">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img src={Img1} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Img2} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Img3} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Img4} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Img5} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
