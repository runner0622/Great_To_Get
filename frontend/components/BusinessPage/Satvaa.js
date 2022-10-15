import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarasoleCard from "./CarasoleCard";
import satvaaImg from "../../../images/profile.png";
function Satvaa() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      // slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // slidesToSlide: 1, // optional, default to 1.
    },
  };
  const carasoleData = [
    {
      header: "vitamin c",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae saepe a doloribus delectus harum. Esse in cupiditate autem assumenda impedit?",
      img: "https://images.unsplash.com/photo-1556739664-787e863d09c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dml0YW1pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      header: "b complex",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae saepe a doloribus delectus harum. Esse in cupiditate autem assumenda impedit?",
      img: "https://images.unsplash.com/photo-1565071783280-719b01b29912?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dml0YW1pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      header: "vitamin E",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae saepe a doloribus delectus harum. Esse in cupiditate autem assumenda impedit?",
      img: "https://images.unsplash.com/photo-1611073061835-e77b1b16d3f3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dml0YW1pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      header: "vitamin D3",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae saepe a doloribus delectus harum. Esse in cupiditate autem assumenda impedit?",
      img: "https://images.unsplash.com/photo-1544829894-eb023ba95a38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dml0YW1pbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div>
      <h1 className="satvaa-header">SATVAA</h1>
      <div className="satvaa-info">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque enim
          quaerat aut inventore similique eos rem iusto ullam facere fugiat
          corporis nobis, iure ratione illum quas laboriosam voluptatibus
          blanditiis? Ea, vero labore! Eius dolorum ullam numquam possimus,
          doloribus ducimus inventore voluptatem placeat asperiores, reiciendis
          similique veritatis iusto odio esse? Possimus.
        </p>
        <img src={satvaaImg} className="satvaa-img" alt="" />
      </div>
      <h3 className="satvaa-products-header">OUR PRODUCTS</h3>
      <div className="satvaa-products-carasole">
        <Carousel
          showDots={true}
          centerMode={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          // renderDotsOutside={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {carasoleData.map((data, id) => (
            <CarasoleCard data={data} key={id} />
          ))}
          {carasoleData.map((data, id) => (
            <CarasoleCard data={data} key={id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Satvaa;
