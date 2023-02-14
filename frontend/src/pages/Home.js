import axios from "axios";
import { useEffect, useState } from "react";

import "./styles/Home.css";
import Card from "../components/Card";
import img2 from "../assets/img2.jpg";
import video from "../assets/video.mp4";

import Navbar from "../components/Navbar";

const Home = () => {
  let path = process.env.REACT_APP_PATH;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await axios.get(`${path}/api/getdata`);
      console.log(response.data);
      setData(response.data);
    }
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="parentvideo">
        <div className="childvideo">
          <video src={video} autoPlay muted loop className="videoTag" />
          <span className="name animate__animated animate__fadeInDown">
            Your Dream Home is Here
            <p className="quote">
              Dear Home, You are a passage to me where
              <br />
              I share my old and good <br />
              memories which is ever lasting for......
            </p>
          </span>
        </div>
      </div>

      <div className="container">
        {data.slice(0, 4).map((item) => {
          return (
            <Card
              url={img2}
              name={item.name}
              description={item.description}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              area={item.area}
              price={item.price}
              todo={item.todo}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
