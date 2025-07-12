import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const slidesData = [
  {
    title: "Irgendwo",
    image:
      "https://imgs.search.brave.com/d_RsT9F1Q38BgP3uWmdM-FlO8XIyJRdDSL6KRS1yju4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIx/Mzg3OTQ3MC9waG90/by9oYW5kcy1jdXR0/aW5nLXBhcGVyLXdp/dGgtaW1wb3NzaWJs/ZS10ZXh0LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz0tbFhL/NmhUTmQ0QjdHZk1I/ZTdKUHdidm1od2Rh/NnNrSHZPdU1DREgx/YUdrPQ",
  },
  {
    title: "Something",
    image:
      "https://imgs.search.brave.com/YbOSksEUpCRUbe3xECKxH33wNc0UMyuwIUVjEh5sSmA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/NDk1NDkxNy9waG90/by93b2RkZW4tZGlj/ZS1vbi1hLXRhYmxl/LWZvcm0tdGhlLXdv/cmRzLWNoYW5jZS1h/bmQtY2hhbmdlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz14/TDJzUGRCN0RXT3Fz/VjNnTU9hLS0zWVpZ/cVk3dS12aTZWOVZT/ZWF4UUdRPQ",
  },
  {
    title: "IDK",
    image:
      "https://imgs.search.brave.com/FcxLHXpnNxeSwIyxr5KvFQsgfPD98-tduMiZig_FnEI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ2/MjAzNDYzMC9waG90/by90aGUtY2hvaWNl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1OSVVwcjBzUVl2/NDFkNi0wWmhXb21R/RVpSbXZPZlFyRDJC/NmhNWU9PVGlzPQ",
  },
  {
    title: "Manchmal",
    image:
      "https://imgs.search.brave.com/hUKYUwrLQv0DvJInZI3SQ3X3DbS5P1V6MF9D_VrqYC8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/NDM5NDE4Ny9waG90/by9ib2FyZC1nYW1l/LW9uLWEtdGFibGUt/cmVhZHktdG8tcGxh/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dVFYZkpGNjY2/WHVSSzZEcFZxSV9Y/aGFDUTlNLWJyYURx/SERDTHp2VVVvQT0",
  },
  {
    title: "Einmal",
    image:
      "https://imgs.search.brave.com/RgeSC4clna-sPIyuOBH7GVl8Ns_lWKl8ZWbhEbF3VDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/MDM3MDg4Ni9waG90/by9idXNpbmVzcy1t/YW4tcGxhY2luZy13/b29kZW4tYmxvY2st/b24tYS10b3dlci1j/b25jZXB0LXJpc2st/Y29udHJvbC1wbGFu/bmluZy1hbmQtc3Ry/YXRlZ3ktaW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUlC/aWZiTDNkcjNCcjhN/azFmb0cwNzdhTU1y/R3BvSnJVVndYTVZG/S2J3OU09",
  },
  {
    title: "Einmal222",
    image:
      "https://imgs.search.brave.com/10mm6Vd6dpL9BAMNK2o4U8O1L9oC65MoZ3I-nRhhorw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/MjQ4MjU3L3Bob3Rv/L3Rocm93aW5nLWRp/Y2VzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz13d2NyNjZu/WFNXUlRydGJmVkZQ/T3l5TmlreG5DYWFa/UGN0aUxha29KYTNj/PQ",
  },
];

const styles = {
  card: {
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
    padding: "16px",
    border: "hidden"
  },

  imageContainer: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },

  content: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#333",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#4a6bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginTop: "auto",
    transition: "background-color 0.3s ease",
  },
};

const SlideCard = ({ title, image }) => {
  const handleClick = () => {
    toast.info(`${title} clicked!`, { autoClose: 2000 });
  };

  return (
    <div className="card mt-5" style={styles.card}>
      <div styles={styles.imageContainer}>
        <img
          src={image}
          alt={title}
          style={styles.image}
        />
      </div>
      <div styles={styles.content}>
      <h3 style={styles.title}>{title}</h3>
      <button className="btn-hover" onClick={handleClick} style={styles.button}>
        Notify Me
      </button>
      </div>
    </div>
  );
};

const PracticeNPM = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        // slidesPerGroup={3}
        navigation
        pagination={{ clickable: true }}
        style={{ width: "100%", height: "420px" }}
        centeredSlides={true}
        // scrollbar={{ draggable: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        onSlideChange={() =>
          toast.success("Slide changed", { autoClose: 500 })
        }
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} >
            <SlideCard title={slide.title} image={slide.image} />
          </SwiperSlide>
        ))}
        ...
      </Swiper>
      <ToastContainer />
    </div>
  );
};

export default PracticeNPM;
