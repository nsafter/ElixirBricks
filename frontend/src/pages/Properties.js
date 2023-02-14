import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import property from "../assets/property-page.jpg";
import "./styles/Properties.css";
import Navbar from "../components/Navbar";

const Properties = () => {
  let path = process.env.REACT_APP_PATH;
  const [data, setData] = useState([]);
  const [bedroom, setBedroom] = useState(2);
  const [bathroom, setBathroom] = useState(2);
  const [area, setArea] = useState(500);
  const [minprice, setMinPrice] = useState(10000);
  const [maxprice, setMaxPrice] = useState(10000);
  const [todo, setTodo] = useState("buy");
  const [gotData, setGotData] = useState("");

  const imgVars = [`${img1}`, `${img2}`, `${img3}`, `${img4}`, `${img5}`];

  async function handleFilter() {
    const response = await axios.get(`${path}/api/filterdata`, {
      params: {
        bedroom,
        bathroom,
        area,
        minprice,
        maxprice,
        todo,
      },
    });
    setData(response.data);
    console.log(response);

    if (response.data.length > 0) {
      setGotData("");
    } else {
      setGotData("Oops!! no match found...");
    }
  }

  return (
    <>
      <Navbar />
      <div className="parentProp">
        <div className="childProp">
          <img src={property} alt="noimg" className="property-img" />
          <span className="slogan animate__animated animate__fadeInDown">
            Search for Homes in Your Neighbourhood
          </span>
          <div className="filters">
            <div>
              <label className="filter-label">Bedrooms: </label>
              <select onChange={(e) => setBedroom(parseInt(e.target.value))}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>
            </div>
            <div>
              <label className="filter-label">Bathrooms:</label>
              <select onChange={(e) => setBathroom(parseInt(e.target.value))}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>
            </div>
            <div>
              <label className="filter-label">Buy/Rent:</label>
              <select onChange={(e) => setTodo(e.target.value)}>
                <option value={"buy"}>buy</option>
                <option value={"rent"}>rent</option>
              </select>
            </div>
            <div>
              <label className="filter-label">Area(Sq Ft):</label>
              <input
                type="range"
                min="500"
                max="50000"
                step="150"
                onChange={(e) => setArea(parseInt(e.target.value))}
              />
              <label className="value-label"> {area}</label>
            </div>
            <div>
              <label className="filter-label">Min(&#8377;):</label>
              <input
                type="range"
                min="10000"
                max="7500000"
                step="50000"
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
              <label className="value-label">{minprice}</label>
            </div>
            <div>
              <label className="filter-label">Max(&#8377;):</label>
              <input
                type="range"
                min="100000"
                max="7500000"
                step="50000"
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <label className="value-label">{maxprice}</label>
            </div>
          </div>
          <button className="filter-btn" onClick={handleFilter}>
            Search&nbsp;
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="budget">
        <center>
          <h1>
            Not sure about your budget.. check our{" "}
            <Link to="/calculator" className="emilink">
              emi calculator
            </Link>
          </h1>
        </center>
      </div>
      <center>
        <h1 className="err">{gotData}</h1>
      </center>
      <div className="container">
        {data.map((item) => {
          return (
            <Card
              url={imgVars[Math.floor(Math.random() * imgVars.length)]}
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

export default Properties;
