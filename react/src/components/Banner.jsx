import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Img1 from "../assets/applefront.jpg";
import Img2 from "../assets/cherry.jpg";
import Img3 from "../assets/graphs.jpg";
import Img4 from "../assets/straberry.jpg";
import Img5 from "../assets/mix.jpg";
import "../App.css";

const style = {
  width: "100vw",
  height: "80vh",
  objectFit: "cover",
};

const Banner = () => {
  return (
    <div
      className="swiper-container"
      style={{ position: "relative", height: "80vh" }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          pointerEvents: "none",
        }}
      >
        <h1
          className="text-center mt-5"
          style={{
            fontSize: "5rem",
            fontWeight: "bolder",
            textTransform: "uppercase",
          }}
        >
          Welcome
        </h1>
        <p
          className="text-center mb-5"
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Explore our fresh and delicious fruits
        </p>
      </div>
      <Swiper
        style={{ height: "100%" }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img src={Img2} alt="idk" className="img-fluid" style={style} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Img1} alt="idk" className="img-fluid" style={style} />
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
