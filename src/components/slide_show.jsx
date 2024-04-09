import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import ad1 from "../imgs/ad1.png";
import ad2 from "../imgs/ad2.png";
import ad3 from "../imgs/ad3.png";
const contentStyle1 = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundSize: "cover",
  background: `url(${ad1})`,
  backgroundPosition: "center",
};
const contentStyle2 = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundSize: "cover",
  background: `url(${ad2})`,
  backgroundPosition: "center",
};
const contentStyle3 = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundSize: "cover",
  background: `url(${ad3})`,
  backgroundPosition: "center",
};
const Slideshow = () => (
  <Carousel autoplay>
    <div>
      <Link to={`/book/1`}>
        <h3 style={contentStyle1}></h3>
      </Link>
    </div>
    <div>
      <Link to={`/book/2`}>
        <h3 style={contentStyle2}></h3>
      </Link>
    </div>
    <div>
      <Link to={`/book/3`}>
        <h3 style={contentStyle3}></h3>
      </Link>
    </div>
  </Carousel>
);
export default Slideshow;
